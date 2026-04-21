import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/students`;

// ─── Get All Students (with Pagination) ──────────────────
export const getAllStudents = async (page = 1, limit = 10) => {
  const response = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
  return response.data;
};

// ─── Get Single Student ───────────────────────────────────
export const getStudentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// ─── Create Student ───────────────────────────────────────
export const createStudent = async (studentData) => {
  const response = await axios.post(BASE_URL, studentData);
  return response.data;
};

// ─── Update Student ───────────────────────────────────────
export const updateStudent = async (id, studentData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, studentData);
  return response.data;
};

// ─── Delete Student ───────────────────────────────────────
export const deleteStudent = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};