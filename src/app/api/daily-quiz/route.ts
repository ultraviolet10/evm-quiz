import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';
import { getDailyQuiz } from '~/lib/database/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');
    
    // Use provided date or default to today
    const date = dateParam || format(new Date(), 'yyyy-MM-dd');
    
    // Get the daily quiz from database
    const quiz = await getDailyQuiz(date);
    
    if (!quiz) {
      return NextResponse.json(
        { error: 'No quiz available for this date' },
        { status: 404 }
      );
    }
    
    // Return quiz without correct answers (for frontend)
    const response = {
      quizId: quiz.id,
      date: quiz.quiz_date,
      questions: quiz.questions.map((q: any) => ({
        id: q.id,
        questionText: q.question_text,
        options: q.options,
        metadata: {
          category: q.category,
          difficulty: q.difficulty,
          opcodeName: q.opcode_name,
        },
      })),
      timeLimit: 30, // 30 seconds per question
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching daily quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}