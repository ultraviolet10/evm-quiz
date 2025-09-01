export interface User {
  id: string;
  fid: number;
  username: string | null;
  display_name: string | null;
  pfp_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DailyQuiz {
  id: string;
  quiz_date: string;
  questions: QuizQuestion[];
  seed: string;
  difficulty_progression: ('easy' | 'medium' | 'hard')[];
  created_at: string;
}

export interface Question {
  id: string;
  opcode_name: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_type: 'value' | 'hex' | 'description' | 'gas' | 'category' | 'inputs_outputs';
  question_text: string;
  correct_answer: string;
  options: string[];
  explanation: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  metadata: {
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    opcodeName: string;
  };
}

export interface UserAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  answers: string[];
  score: number;
  completion_time_seconds: number;
  submitted_at: string;
}

export interface FriendRelationship {
  id: string;
  user_fid: number;
  friend_fid: number;
  relationship_type: string;
  last_verified: string;
}

export interface LeaderboardEntry {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  score: number;
  completion_time: number;
  submitted_at: string;
}