const express = require("express");
const router = express.Router();
const { addMark, deleteMark } = require("../controllers/marksController");

router.post("/", addMark);          // POST   /api/marks
router.delete("/:id", deleteMark);  // DELETE /api/marks/:id

module.exports = router;