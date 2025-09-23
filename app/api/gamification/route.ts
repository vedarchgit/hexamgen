import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  // In a real app, you'd get the user ID from the session.
  const userId = '123e4567-e89b-12d3-a456-426614174000'; // Placeholder user ID

  try {
    const { rows, rowCount } = await sql`SELECT * FROM user_totals WHERE user_id = ${userId}`;

    if (rowCount === 0) {
      // Optionally, create a new user totals entry if one doesn't exist.
      const { rows: newRows } = await sql`
        INSERT INTO user_totals (user_id, xp_total, level, streak, last_active)
        VALUES (${userId}, 0, 1, 0, NOW()::date)
        RETURNING *;
      `;
      return NextResponse.json(newRows[0]);
    }
    
    // Optional: Check and update streak logic would go here.
    // e.g., if last_active was yesterday, increment streak.
    // if last_active was before yesterday, reset streak to 0 or 1.

    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error('Failed to fetch gamification status:', error);
    return NextResponse.json({ message: 'Failed to fetch gamification status' }, { status: 500 });
  }
}
