const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "Rejected", "Accepted"],
      default: "Applied",
    },

    applicationStage: {
      type: String,
      enum: [
        "Applied",
        "Screening",
        "Interview",
        "Technical Round",
        "HR Round",
        "Final Round",
      ],
      default: "Applied",
    },

    expectedOutcome: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    interviewDate: {
      type: Date,
    },

    interviewTime: {
      type: String,
    },

    website: {
      type: String,
    },

    notes: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
