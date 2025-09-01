import { supabase, supabaseAdmin } from './supabase';
import { User, DailyQuiz, Question, UserAttempt, LeaderboardEntry } from './types';

// User queries
export async function getUserByFid(fid: number): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('fid', fid)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

export async function upsertUser(userData: Partial<User>): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .upsert(userData, { onConflict: 'fid' })
    .select()
    .single();

  if (error) {
    console.error('Error upserting user:', error);
    return null;
  }

  return data;
}

// Daily quiz queries
export async function getDailyQuiz(date: string): Promise<DailyQuiz | null> {
  const { data, error } = await supabase
    .from('daily_quizzes')
    .select('*')
    .eq('quiz_date', date)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching daily quiz:', error);
    return null;
  }

  return data;
}

export async function createDailyQuiz(quizData: Omit<DailyQuiz, 'id' | 'created_at'>): Promise<DailyQuiz | null> {
  const { data, error } = await supabaseAdmin
    .from('daily_quizzes')
    .insert(quizData)
    .select()
    .single();

  if (error) {
    console.error('Error creating daily quiz:', error);
    return null;
  }

  return data;
}

// Question queries
export async function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard', limit?: number): Promise<Question[]> {
  let query = supabase
    .from('questions')
    .select('*')
    .eq('difficulty', difficulty);

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching questions:', error);
    return [];
  }

  return data || [];
}

export async function getAllQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching all questions:', error);
    return [];
  }

  return data || [];
}

// User attempt queries
export async function getUserAttempt(userId: string, quizId: string): Promise<UserAttempt | null> {
  const { data, error } = await supabase
    .from('user_attempts')
    .select('*')
    .eq('user_id', userId)
    .eq('quiz_id', quizId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user attempt:', error);
    return null;
  }

  return data;
}

export async function createUserAttempt(attemptData: Omit<UserAttempt, 'id' | 'submitted_at'>): Promise<UserAttempt | null> {
  const { data, error } = await supabaseAdmin
    .from('user_attempts')
    .insert(attemptData)
    .select()
    .single();

  if (error) {
    console.error('Error creating user attempt:', error);
    return null;
  }

  return data;
}

// Leaderboard queries
export async function getDailyLeaderboard(quizId: string, friendFids: number[] = []): Promise<LeaderboardEntry[]> {
  let query = supabase
    .from('user_attempts')
    .select(`
      score,
      completion_time_seconds,
      submitted_at,
      users!inner (
        fid,
        username,
        display_name,
        pfp_url
      )
    `)
    .eq('quiz_id', quizId)
    .order('score', { ascending: false })
    .order('completion_time_seconds', { ascending: true });

  // Filter by friend FIDs if provided
  if (friendFids.length > 0) {
    query = query.in('users.fid', friendFids);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return data?.map((entry: any) => ({
    fid: entry.users.fid,
    username: entry.users.username,
    display_name: entry.users.display_name,
    pfp_url: entry.users.pfp_url,
    score: entry.score,
    completion_time: entry.completion_time_seconds,
    submitted_at: entry.submitted_at,
  })) || [];
}