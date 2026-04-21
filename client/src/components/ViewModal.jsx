import React, { useState } from "react";
import Swal from "sweetalert2";
import { addMark, deleteMark } from "../services/marksService";

const ViewModal = ({ show, onClose, student, onMarksUpdate }) => {
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show || !student) return null;

  // ─── Add Mark ─────────────────────────────────────────────
  const handleAddMark = async (e) => {
    e.preventDefault();
    if (!subject || !marks) {
      Swal.fire("Error!", "Subject aur Marks dono required hain!", "error");
      return;
    }
    try {
      setLoading(true);
      await addMark({ student_id: student.id, subject, marks });
      Swal.fire("Added!", "Mark added successfully!", "success");
      setSubject("");
      setMarks("");
      onMarksUpdate(student.id);
    } catch (error) {
      Swal.fire("Error!", "Failed to add mark", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── Delete Mark ──────────────────────────────────────────
  const handleDeleteMark = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This mark will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteMark(id);
        Swal.fire("Deleted!", "Mark deleted successfully!", "success");
        onMarksUpdate(student.id);
      } catch (error) {
        Swal.fire("Error!", "Failed to delete mark", "error");
      }
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          {/* ─── Header ─── */}
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">🎓 {student.name} — Details</h5>
            <button className="btn-close btn-close-white" onClick={onClose} />
          </div>

          {/* ─── Body ─── */}
          <div className="modal-body">

            {/* Student Info */}
            <div className="row mb-3">
              <div className="col-md-4">
                <p><strong>📧 Email:</strong> {student.email}</p>
              </div>
              <div className="col-md-4">
                <p><strong>🎂 Age:</strong> {student.age}</p>
              </div>
              <div className="col-md-4">
                <p><strong>👨‍👦 Parent ID:</strong> {student.parent_id || "—"}</p>
              </div>
            </div>

            <hr />

            {/* ─── Marks Table ─── */}
            <h6 className="fw-bold mb-3">📊 Marks</h6>
            {student.marks && student.marks.length === 0 ? (
              <p className="text-muted">No marks found</p>
            ) : (
              <table className="table table-bordered table-sm mb-3">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {student.marks && student.marks.map((m, index) => (
                    <tr key={m.id}>
                      <td>{index + 1}</td>
                      <td>{m.subject}</td>
                      <td>{m.marks}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteMark(m.id)}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <hr />

            {/* ─── Add Mark Form ─── */}
            <h6 className="fw-bold mb-3">➕ Add New Mark</h6>
            <form onSubmit={handleAddMark}>
              <div className="row g-2 align-items-end">
                <div className="col-md-5">
                  <label className="form-label fw-bold">Subject *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">Marks *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Mark"}
                  </button>
                </div>
              </div>
            </form>

          </div>

          {/* ─── Footer ─── */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewModal;