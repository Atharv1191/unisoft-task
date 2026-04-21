const sql = require("../configs/db");

// ─── Add Mark ─────────────────────────────────────────────
const addMark = async (req, res) => {
  try {
    const { student_id, subject, marks } = req.body;

    if (!student_id || !subject || marks === undefined) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const result = await sql`
      INSERT INTO marks (student_id, subject, marks)
      VALUES (${student_id}, ${subject}, ${parseInt(marks)})
      RETURNING *
    `;

    res.status(201).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── Delete Mark ──────────────────────────────────────────
const deleteMark = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql`
      DELETE FROM marks WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ success: false, error: "Mark not found" });
    }

    res.status(200).json({ success: true, message: "Mark deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addMark, deleteMark };