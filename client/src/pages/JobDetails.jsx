import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/jobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return <h2>Loading...</h2>;
  }

  return (
    <DashboardLayout>
      <div className="job-details-page">
        <div className="job-details-card">
          <div className="details-heading-box">
            <h1>
              Job Details: {job.company} - {job.position}
            </h1>
          </div>

          <div className="details-grid">
            <div>
              <label>Company</label>
              <p>{job.company}</p>
            </div>

            <div>
              <label>Position</label>
              <p>{job.position}</p>
            </div>

            <div>
              <label>Status</label>
              <p>
                <span className={`status-badge ${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
              </p>
            </div>

            <div>
              <label>Application Date</label>
              <p>
                {job.appliedDate
                  ? new Date(job.appliedDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <label>Interview Date</label>
              <p>
                {job.interviewDate
                  ? new Date(job.interviewDate).toLocaleDateString()
                  : "Not Scheduled"}
              </p>
            </div>

            <div>
              <label>Interview Time</label>
              <p>{job.interviewTime || "Not Scheduled"}</p>
            </div>

            <div>
              <label>Deadline Date</label>
              <p>
                {job.deadlineDate
                  ? new Date(job.deadlineDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <label>Follow Up Date</label>
              <p>
                {job.followUpDate
                  ? new Date(job.followUpDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <label>Application Stage</label>
              <p>{job.applicationStage || "N/A"}</p>
            </div>

            <div>
              <label>Expected Outcome</label>
              <p>{job.expectedOutcome || "N/A"}</p>
            </div>

            <div>
              <label>Website</label>
              <p>
                {job.website ? (
                  <a
                    href={job.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="open-btn"
                  >
                    Visit Website
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>

          <div className="notes-section">
            <label>Notes</label>
            <p>{job.notes || "No notes available"}</p>
          </div>

          <div className="job-buttons">
            <button
              className="edit-btn"
              onClick={() => navigate(`/edit-job/${job._id}`)}
            >
              Edit Job
            </button>

            <button className="back-btn" onClick={() => navigate("/jobs")}>
              Back To List
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default JobDetails;
