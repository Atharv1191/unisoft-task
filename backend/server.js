const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

const marksRoutes = require("./routes/markRoutes");
app.use("/api/marks", marksRoutes);

// ─── Test Route ───────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "🎓 Student API is running!" });
});

// ─── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ─── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});