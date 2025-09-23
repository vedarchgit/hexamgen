---------------- 01_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table from auth provider
-- In Supabase, this is `auth.users`, but we can define a public view or a local table for development.
CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY,
    email text UNIQUE,
    created_at timestamptz DEFAULT now()
);

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    user_id uuid PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    display_name text,
    avatar_url text
);

-- Subjects table
CREATE TABLE IF NOT EXISTS public.subjects (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    code text,
    year text, -- e.g., 'FE', 'SE', 'TE', 'BE'
    name text NOT NULL,
    branch text DEFAULT 'Computer Engineering'
);

-- Notes table
CREATE TABLE IF NOT EXISTS public.notes (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id uuid REFERENCES public.subjects(id) ON DELETE SET NULL,
    title text NOT NULL,
    content_md text,
    content_url text,
    created_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    tags text[]
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS public.quizzes (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id uuid REFERENCES public.subjects(id) ON DELETE SET NULL,
    title text NOT NULL,
    is_daily boolean DEFAULT false,
    questions jsonb, -- [{ "question": "...", "options": ["A", "B"], "correct": 0 }]
    created_at timestamptz DEFAULT now()
);

-- Quiz Attempts table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id uuid REFERENCES public.quizzes(id) ON DELETE CASCADE,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    score integer,
    answers jsonb, -- [{ "question_index": 0, "selected_option": 1 }]
    created_at timestamptz DEFAULT now()
);

-- Past Year Questions (PYQs) table
CREATE TABLE IF NOT EXISTS public.pyqs (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE,
    exam_year integer,
    term text,
    question_text text NOT NULL,
    topics text[],
    difficulty integer
);

-- Heatmap Topics table
CREATE TABLE IF NOT EXISTS public.heatmap_topics (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE,
    topic text NOT NULL,
    intensity numeric,
    UNIQUE(subject_id, topic)
);

-- XP Events table
CREATE TYPE xp_event_kind AS ENUM ('quiz_attempt', 'note_read', 'streak_increment', 'pyq_analyzed');
CREATE TABLE IF NOT EXISTS public.xp_events (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    kind xp_event_kind,
    amount integer,
    meta jsonb,
    created_at timestamptz DEFAULT now()
);

-- User Totals (denormalized cache)
CREATE TABLE IF NOT EXISTS public.user_totals (
    user_id uuid PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    xp_total integer DEFAULT 0,
    level integer DEFAULT 1,
    streak integer DEFAULT 0,
    last_active date
);

-- New tables for courses and materials
CREATE TABLE IF NOT EXISTS public.courses (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    description text,
    subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.course_materials (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
    title text NOT NULL,
    file_url text NOT NULL, -- URL to the uploaded file in blob storage
    created_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- Materialized view for PYQ stats (optional, but good for performance)
CREATE MATERIALIZED VIEW IF NOT EXISTS public.pyq_stats AS
SELECT
    subject_id,
    unnest(topics) as topic,
    count(*) as frequency
FROM public.pyqs
GROUP BY subject_id, topic;

-- Materialized view for leaderboard (optional)
CREATE MATERIALIZED VIEW IF NOT EXISTS public.leaderboard_cache AS
SELECT
    user_id,
    xp_total,
    DENSE_RANK() OVER (ORDER BY xp_total DESC) as rank
FROM public.user_totals
ORDER BY rank;
