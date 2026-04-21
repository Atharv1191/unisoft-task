import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/marks`;

// ─── Add Mark ─────────────────────────────────────────────
export const addMark = async (markData) => {
  const response = await axios.post(BASE_URL, markData);
  return response.data;
};

// ─── Delete Mark ──────────────────────────────────────────
export const deleteMark = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};