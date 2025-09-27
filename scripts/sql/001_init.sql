-- MariaDB schema aligned to models
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  user_id VARCHAR(64) PRIMARY KEY,
  display_name VARCHAR(120),
  avatar_url VARCHAR(255),
  CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS subjects (
  id VARCHAR(36) PRIMARY KEY,
  code VARCHAR(32),
  year VARCHAR(8),
  name VARCHAR(160),
  branch VARCHAR(80) DEFAULT 'Computer Engineering'
);

CREATE TABLE IF NOT EXISTS notes (
  id VARCHAR(36) PRIMARY KEY,
  subject_id VARCHAR(36),
  title VARCHAR(200),
  content_md MEDIUMTEXT,
  content_url VARCHAR(255),
  created_by VARCHAR(64),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_notes_subject (subject_id),
  CONSTRAINT fk_notes_subject FOREIGN KEY (subject_id) REFERENCES subjects(id),
  CONSTRAINT fk_notes_user FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS quizzes (
  id VARCHAR(36) PRIMARY KEY,
  subject_id VARCHAR(36),
  title VARCHAR(200),
  is_daily BOOLEAN DEFAULT 0,
  questions JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_quizzes_subject (subject_id),
  CONSTRAINT fk_quizzes_subject FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id VARCHAR(36) PRIMARY KEY,
  quiz_id VARCHAR(36),
  user_id VARCHAR(64),
  score INT,
  answers JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_attempts_quiz (quiz_id),
  INDEX idx_attempts_user (user_id),
  CONSTRAINT fk_attempts_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
  CONSTRAINT fk_attempts_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS pyqs (
  id VARCHAR(36) PRIMARY KEY,
  subject_id VARCHAR(36),
  exam_year INT,
  term VARCHAR(32),
  question_text MEDIUMTEXT,
  topics JSON,
  difficulty INT,
  INDEX idx_pyq_subject (subject_id),
  CONSTRAINT fk_pyq_subject FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS heatmap_topics (
  id VARCHAR(36) PRIMARY KEY,
  subject_id VARCHAR(36),
  topic VARCHAR(160),
  intensity INT,
  UNIQUE KEY uq_subject_topic (subject_id, topic),
  CONSTRAINT fk_heatmap_subject FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS xp_events (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(64),
  kind VARCHAR(48),
  amount INT,
  meta JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_xp_user (user_id),
  CONSTRAINT fk_xp_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_totals (
  user_id VARCHAR(64) PRIMARY KEY,
  xp_total INT DEFAULT 0,
  level INT DEFAULT 1,
  streak INT DEFAULT 0,
  last_active DATETIME NULL,
  CONSTRAINT fk_totals_user FOREIGN KEY (user_id) REFERENCES users(id)
);
