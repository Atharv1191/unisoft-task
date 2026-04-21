const sql = require("../configs/db");

// ─── Create Student ───────────────────────────────────────
const createStudent = async (req, res) => {
  try {
    const { name, email, age, parent_id } = req.body;
    const parentId = parent_id === "" || parent_id === undefined ? null : parseInt(parent_id);
    const studentAge = parseInt(age);

    const result = await sql`
      INSERT INTO students (name, email, age, parent_id)
      VALUES (${name}, ${email}, ${studentAge}, ${parentId})
      RETURNING *
    `;
    res.status(201).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── Get All Students (with Pagination) ──────────────────
const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const students = await sql`
      SELECT * FROM students
      ORDER BY id DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const total = await sql`SELECT COUNT(*) FROM students`;
    const totalCount = parseInt(total[0].count);

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── Get Single Student with Marks ───────────────────────
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await sql`
      SELECT * FROM students WHERE id = ${id}
    `;

    if (student.length === 0) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    const marks = await sql`
      SELECT * FROM marks WHERE student_id = ${id}
    `;

    res.status(200).json({ success: true, data: { ...student[0], marks } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── Update Student ───────────────────────────────────────
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, parent_id } = req.body;
    const parentId = parent_id === "" || parent_id === undefined ? null : parseInt(parent_id);
    const studentAge = parseInt(age);

    const result = await sql`
      UPDATE students
      SET name = ${name}, email = ${email}, age = ${studentAge}, parent_id = ${parentId}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── Delete Student ───────────────────────────────────────
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql`
      DELETE FROM students WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};