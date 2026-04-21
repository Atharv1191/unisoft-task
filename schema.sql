-- Students Table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INTEGER NOT NULL,
  parent_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Marks Table
CREATE TABLE marks (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL,
  subject VARCHAR(100) NOT NULL,
  marks INTEGER NOT NULL CHECK (marks >= 0 AND marks <= 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Index for performance
CREATE INDEX idx_student_id ON marks(student_id);