import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/jobForm.css";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    appliedDate: "",
    interviewDate: "",
    interviewTime: "",
    deadlineDate: "",
    followUpDate: "",
    applicationStage: "Applied",
    expectedOutcome: "Pending",
    website: "",
    notes: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);

      setFormData({
        company: res.data.company || "",
        position: res.data.position || "",
        status: res.data.status || "Applied",

        appliedDate: res.data.appliedDate
          ? res.data.appliedDate.split("T")[0]
          : "",

        interviewDate: res.data.interviewDate
          ? res.data.interviewDate.split("T")[0]
          : "",

        interviewTime: res.data.interviewTime || "",

        applicationStage: res.data.applicationStage || "Applied",

        expectedOutcome: res.data.expectedOutcome || "Pending",

        website: res.data.website || "",

        notes: res.data.notes || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/jobs/${id}`, formData);

      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="form-page">
        <div className="form-card">
          <h1>Edit Job Application</h1>

          <form onSubmit={handleSubmit}>
            {/* Company + Position */}
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

            {/* Status + Applied Date */}
            <div className="form-row">
              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                  <option>Accepted</option>
                </select>
              </div>

              <div className="form-group">
                <label>Application Date</label>

                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Interview Date + Time */}
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

            {/* Stage + Outcome */}
            <div className="form-row">
              <div className="form-group">
                <label>Application Stage</label>

                <select
                  name="applicationStage"
                  value={formData.applicationStage}
                  onChange={handleChange}
                >
                  <option>Applied</option>
                  <option>Screening</option>
                  <option>Interview</option>
                  <option>Technical Round</option>
                  <option>HR Round</option>
                  <option>Final Round</option>
                </select>
              </div>

              <div className="form-group">
                <label>Expected Outcome</label>

                <select
                  name="expectedOutcome"
                  value={formData.expectedOutcome}
                  onChange={handleChange}
                >
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>

            {/* Website */}
            <div className="form-group">
              <label>Website</label>

              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://company.com"
              />
            </div>

            {/* Notes */}
            <div className="form-group">
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
                Save Changes
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

export default EditJob;
