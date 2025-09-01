import { NextRequest, NextResponse } from 'next/server';
import { getDailyQuiz, createUserAttempt, getUserByFid } from '~/lib/database/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quizId, answers, completionTimeSeconds, userFid } = body;
    
    // Validate required fields
    if (!quizId || !answers || !completionTimeSeconds || !userFid) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get the quiz to validate answers
    const quiz = await getDailyQuiz(new Date().toISOString().split('T')[0]);
    
    if (!quiz || quiz.id !== quizId) {
      return NextResponse.json(
        { error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }
    
    // Get user
    const user = await getUserByFid(userFid);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Calculate score
    let correctCount = 0;
    const results = quiz.questions.map((question: any, index: number) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correct_answer;
      
      if (isCorrect) {
        correctCount++;
      }
      
      return {
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correct_answer,
        isCorrect,
        explanation: question.explanation,
        opcodeInfo: {
          name: question.opcode_name,
          category: question.category,
          ...question.metadata,
        },
      };
    });
    
    // Save attempt to database
    const attempt = await createUserAttempt({
      user_id: user.id,
      quiz_id: quizId,
      answers,
      score: correctCount,
      completion_time_seconds: completionTimeSeconds,
    });
    
    if (!attempt) {
      return NextResponse.json(
        { error: 'Failed to save quiz attempt' },
        { status: 500 }
      );
    }
    
    const response = {
      score: correctCount,
      totalQuestions: quiz.questions.length,
      completionTime: completionTimeSeconds,
      results,
      // TODO: Add leaderboard position once we have friend system
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}