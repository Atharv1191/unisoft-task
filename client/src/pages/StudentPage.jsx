import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import StudentModal from "../components/StudentModal";
import StudentTable from "../components/StudentTable";
import ViewModal from "../components/ViewModal";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
} from "../services/studentService";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ─── Fetch Students ───────────────────────────────────────
  const fetchStudents = async (page = 1, currentLimit = limit) => {
    try {
      setLoading(true);
      const res = await getAllStudents(page, currentLimit);
      setStudents(res.data);
      setPagination(res.pagination);
    } catch (error) {
      Swal.fire("Error!", "Failed to fetch students", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(1, limit);
  }, []);

  // ─── Add / Edit Submit ────────────────────────────────────
  const handleSubmit = async (formData) => {
    try {
      if (editData) {
        await updateStudent(editData.id, formData);
        Swal.fire("Updated!", "Student updated successfully!", "success");
      } else {
        await createStudent(formData);
        Swal.fire("Added!", "Student added successfully!", "success");
      }
      setShowModal(false);
      setEditData(null);
      fetchStudents(pagination.page, limit);
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.error || "Something went wrong!", "error");
    }
  };

  // ─── Delete ───────────────────────────────────────────────
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteStudent(id);
        Swal.fire("Deleted!", "Student deleted successfully!", "success");
        fetchStudents(pagination.page, limit);
      } catch (error) {
        Swal.fire("Error!", "Failed to delete student", "error");
      }
    }
  };

  // ─── View Student ─────────────────────────────────────────
  const handleView = async (id) => {
    try {
      const res = await getStudentById(id);
      setSelectedStudent(res.data);
      setShowViewModal(true);
    } catch (error) {
      Swal.fire("Error!", "Failed to fetch student details", "error");
    }
  };

  // ─── Marks Update ─────────────────────────────────────────
  const handleMarksUpdate = async (id) => {
    try {
      const res = await getStudentById(id);
      setSelectedStudent(res.data);
    } catch (error) {
      Swal.fire("Error!", "Failed to update marks", "error");
    }
  };

  // ─── Search Filter ────────────────────────────────────────
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  // ─── Page Change ──────────────────────────────────────────
  const handlePageChange = (page) => {
    fetchStudents(page, limit);
  };

  // ─── Limit Change ─────────────────────────────────────────
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    fetchStudents(1, newLimit);
  };

  return (
    <div className="container-fluid py-4 px-4">

      {/* ─── Header ─── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">👨‍🎓 All Students</h4>
        <button
          className="btn btn-dark"
          onClick={() => { setEditData(null); setShowModal(true); }}
        >
          ➕ Add New Student
        </button>
      </div>

      {/* ─── Search Bar ─── */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ─── Loading ─── */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-dark" role="status" />
          <p className="mt-2">Loading students...</p>
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          pagination={pagination}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onEdit={(student) => { setEditData(student); setShowModal(true); }}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      {/* ─── Add/Edit Modal ─── */}
      <StudentModal
        show={showModal}
        onClose={() => { setShowModal(false); setEditData(null); }}
        onSubmit={handleSubmit}
        editData={editData}
      />

      {/* ─── View Modal ─── */}
      <ViewModal
        show={showViewModal}
        onClose={() => { setShowViewModal(false); setSelectedStudent(null); }}
        student={selectedStudent}
        onMarksUpdate={handleMarksUpdate}
      />

    </div>
  );
};

export default StudentsPage;