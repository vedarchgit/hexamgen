import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  try {
    // Use the materialized view for fast leaderboard queries.
    const { rows } = await sql`
      SELECT u.display_name, u.avatar_url, lc.xp_total, lc.rank
      FROM leaderboard_cache lc
      JOIN public.profiles u ON lc.user_id = u.user_id
      ORDER BY lc.rank
      LIMIT 100; -- Limit to top 100
    `;

    // As with the pyq_stats, you might want to refresh this in the background.
    sql`REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_cache;`.catch(console.error);

    return NextResponse.json(rows);

  } catch (error) {
    if ((error as any).message.includes('relation "leaderboard_cache" does not exist')) {
      try {
        await sql`
          CREATE MATERIALIZED VIEW public.leaderboard_cache AS
          SELECT
              user_id,
              xp_total,
              DENSE_RANK() OVER (ORDER BY xp_total DESC) as rank
          FROM public.user_totals
          ORDER BY rank;
        `;
        const { rows } = await sql`
          SELECT p.display_name, p.avatar_url, lc.xp_total, lc.rank
          FROM leaderboard_cache lc
          JOIN public.profiles p ON lc.user_id = p.user_id
          ORDER BY lc.rank
          LIMIT 100;
        `;
        return NextResponse.json(rows);
      } catch (e) {
        console.error('Failed to create and query leaderboard_cache view:', e);
        return NextResponse.json({ message: 'Failed to fetch leaderboard' }, { status: 500 });
      }
    } else {
      console.error('Failed to fetch leaderboard:', error);
      return NextResponse.json({ message: 'Failed to fetch leaderboard' }, { status: 500 });
    }
  }
}
