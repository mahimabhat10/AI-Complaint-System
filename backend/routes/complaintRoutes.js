const express = require("express");

const router = express.Router();

const {
  addComplaint,
  getComplaints,
  updateComplaint,
  searchComplaint
} = require("../controllers/complaintController");

const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addComplaint);

router.get("/", getComplaints);

router.put("/:id", updateComplaint);

router.get("/search/location", searchComplaint);

module.exports = router;