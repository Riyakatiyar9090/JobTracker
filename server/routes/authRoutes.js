const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.put("/profile", protect, updateProfile);

router.put(
  "/upload-photo",
  protect,
  upload.single("image"),
  uploadProfileImage,
);

module.exports = router;
