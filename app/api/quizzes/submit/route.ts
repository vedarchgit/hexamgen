import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

const submitQuizSchema = z.object({
  quiz_id: z.string().uuid(),
  answers: z.array(z.object({
    question_index: z.number().int(),
    selected_option: z.number().int(),
  })),
});

export async function POST(req: NextRequest) {
  const userId = '123e4567-e89b-12d3-a456-426614174000'; // Placeholder user ID

  try {
    const body = await req.json();
    const validation = submitQuizSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid request body', errors: validation.error.errors }, { status: 400 });
    }

    const { quiz_id, answers } = validation.data;

    // 1. Fetch the quiz to get the correct answers
    const { rows: quizRows, rowCount } = await sql`SELECT questions FROM quizzes WHERE id = ${quiz_id}`;
    if (rowCount === 0) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    }

    const correctAnswers = quizRows[0].questions;
    let score = 0;

    // 2. Calculate the score
    answers.forEach(userAnswer => {
      const question = correctAnswers[userAnswer.question_index];
      if (question && question.correct === userAnswer.selected_option) {
        score++;
      }
    });

    // 3. Save the quiz attempt
    const { rows: attemptRows } = await sql`
      INSERT INTO quiz_attempts (quiz_id, user_id, score, answers)
      VALUES (${quiz_id}, ${userId}, ${score}, ${JSON.stringify(answers)})
      RETURNING id, score, created_at;
    `;
    
    // 4. (Optional) Trigger a gamification event
    // This could be a call to another service or a direct DB insert into xp_events.

    return NextResponse.json({ 
      message: 'Quiz submitted successfully', 
      attempt: attemptRows[0] 
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to submit quiz:', error);
    return NextResponse.json({ message: 'Failed to submit quiz' }, { status: 500 });
  }
}
