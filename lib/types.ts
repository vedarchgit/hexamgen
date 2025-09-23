export interface User {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
}

export interface Subject {
  id: string;
  code?: string;
  year?: string;
  name: string;
  branch?: string;
}

export interface Note {
  id: string;
  subject_id: string;
  title: string;
  content_md?: string;
  content_url?: string;
  created_by: string;
  created_at: string;
  tags?: string[];
}

export interface Quiz {
  id: string;
  subject_id: string;
  title: string;
  is_daily: boolean;
  questions: any; // JSONB
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number;
  answers: any; // JSONB
  created_at: string;
}

export interface PYQ {
  id: string;
  subject_id: string;
  exam_year: number;
  term?: string;
  question_text: string;
  topics?: string[];
  difficulty?: number;
}

export interface HeatmapTopic {
  id: string;
  subject_id: string;
  topic: string;
  intensity: number;
}

export interface XPEvent {
  id: string;
  user_id: string;
  kind: 'quiz_attempt' | 'note_read' | 'streak_increment' | 'pyq_analyzed';
  amount: number;
  meta?: any; // JSONB
  created_at: string;
}

export interface UserTotals {
  user_id: string;
  xp_total: number;
  level: number;
  streak: number;
  last_active?: string;
}

export interface Course {
  id: string;
  name: string;
  description?: string;
  subject_id: string;
}

export interface CourseMaterial {
  id: string;
  course_id: string;
  title: string;
  file_url: string;
  created_by: string;
  created_at: string;
}
