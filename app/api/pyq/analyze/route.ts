import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subject_id');

  try {
    // For simplicity, we'll use the pre-calculated materialized view.
    // A more dynamic approach would query the `pyqs` table directly.
    const { rows } = await sql`
      SELECT * FROM pyq_stats
      ${subjectId ? sql`WHERE subject_id = ${subjectId}` : sql``};
    `;

    // Refresh the view in the background for next time (optional)
    sql`REFRESH MATERIALIZED VIEW CONCURRENTLY pyq_stats;`.catch(console.error);

    return NextResponse.json(rows);

  } catch (error) {
    // If the materialized view doesn't exist, create it and then try again.
    if ((error as any).message.includes('relation "pyq_stats" does not exist')) {
      try {
        await sql`
          CREATE MATERIALIZED VIEW public.pyq_stats AS
          SELECT
              subject_id,
              unnest(topics) as topic,
              count(*) as frequency
          FROM public.pyqs
          GROUP BY subject_id, topic;
        `;
        const { rows } = await sql`SELECT * FROM pyq_stats ${subjectId ? sql`WHERE subject_id = ${subjectId}` : sql``}`;
        return NextResponse.json(rows);
      } catch (e) {
        console.error('Failed to create and query pyq_stats view:', e);
        return NextResponse.json({ message: 'Failed to analyze PYQs' }, { status: 500 });
      }
    } else {
      console.error('Failed to analyze PYQs:', error);
      return NextResponse.json({ message: 'Failed to analyze PYQs' }, { status: 500 });
    }
  }
}
