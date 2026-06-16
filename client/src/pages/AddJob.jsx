import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/jobForm.css";

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    applicationStage: "Applied",
    expectedOutcome: "Pending",
    appliedDate: "",
    interviewDate: "",
    interviewTime: "",
    website: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", formData);

      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="form-page">
        <div className="form-card">
          <h1>Add New Job</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Company Name</label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Title</label>

                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </div>

              <div className="form-group">
                <label>Application Stage</label>

                <select
                  name="applicationStage"
                  value={formData.applicationStage}
                  onChange={handleChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Technical Round">Technical Round</option>
                  <option value="HR Round">HR Round</option>
                  <option value="Final Round">Final Round</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Application Date</label>

                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Expected Outcome</label>

                <select
                  name="expectedOutcome"
                  value={formData.expectedOutcome}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Interview Date</label>

                <input
                  type="date"
                  name="interviewDate"
                  value={formData.interviewDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Interview Time</label>

                <input
                  type="time"
                  name="interviewTime"
                  value={formData.interviewTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Job Website</label>

              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://company.com/careers"
              />
            </div>

            <div className="form-group full-width">
              <label>Notes</label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any notes here..."
              />
            </div>

            <div className="button-row">
              <button type="submit" className="submit-btn">
                Add Job
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/jobs")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddJob;
