import React from "react";

const StudentTable = ({
  students,
  pagination,
  limit,
  onPageChange,
  onLimitChange,
  onEdit,
  onDelete,
  onView,
}) => {
  const { page, totalPages, total } = pagination;

  return (
    <div className="card shadow-sm">
      <div className="card-body">

        {/* ─── Top Controls ─── */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <span>Show</span>
            <select
              className="form-select form-select-sm w-auto"
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span>entries</span>
          </div>
          <div className="text-muted small">
            Total: <strong>{total}</strong> students
          </div>
        </div>

        {/* ─── Table ─── */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Parent ID</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.parent_id || "—"}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-info text-white"
                          onClick={() => onView(student.id)}
                        >
                          👁️ View
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => onEdit(student)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onDelete(student.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ─── Pagination ─── */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            Page {page} of {totalPages}
          </small>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(1)}>First</button>
              </li>
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(page - 1)}>Previous</button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => onPageChange(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(page + 1)}>Next</button>
              </li>
              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(totalPages)}>Last</button>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </div>
  );
};

export default StudentTable;