const express = require("express");

const router = express.Router();

const {
  createJob,
  getJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createJob);

router.get("/", protect, getJobs);

router.get("/:id", protect, getSingleJob);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

module.exports = router;
