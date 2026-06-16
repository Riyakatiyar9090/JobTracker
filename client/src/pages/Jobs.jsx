import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/jobs.css";
import DashboardLayout from "../layouts/DashboardLayout";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Newest");
  const [statusOpen, setStatusOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortDropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStatusOpen(false);
      }

      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteJob = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.position.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All Status" || job.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "Oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "A-Z":
          return a.company.localeCompare(b.company);

        case "Z-A":
          return b.company.localeCompare(a.company);

        default:
          return 0;
      }
    });

  // PAGINATION
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <DashboardLayout>
      <div className="jobs-page">
        <div className="jobs-header">
          <div className="jobs-heading-box">
            <h1>Your Job Applications</h1>
          </div>
          <div className="jobs-controls">
            <input
              type="text"
              placeholder="Search company or position..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <div className="custom-dropdown" ref={dropdownRef}>
              <div
                className={`dropdown-selected ${statusOpen ? "open" : ""}`}
                onClick={() => setStatusOpen(!statusOpen)}
              >
                {filterStatus}
                <span className="dropdown-arrow">▼</span>
              </div>

              {statusOpen && (
                <div className="dropdown-menu">
                  {[
                    "All Status",
                    "Applied",
                    "Interview",
                    "Rejected",
                    "Accepted",
                  ].map((item) => (
                    <div
                      key={item}
                      className={`dropdown-item ${
                        filterStatus === item ? "active" : ""
                      }`}
                      onClick={() => {
                        setFilterStatus(item);
                        setCurrentPage(1);
                        setStatusOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="custom-dropdown" ref={sortDropdownRef}>
              <div
                className={`dropdown-selected ${sortOpen ? "open" : ""}`}
                onClick={() => setSortOpen(!sortOpen)}
              >
                {sortBy}
                <span className="dropdown-arrow">▼</span>
              </div>

              {sortOpen && (
                <div className="dropdown-menu">
                  {["Newest", "Oldest", "A-Z", "Z-A"].map((item) => (
                    <div
                      key={item}
                      className={`dropdown-item ${
                        sortBy === item ? "active" : ""
                      }`}
                      onClick={() => {
                        setSortBy(item);
                        setSortOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="add-btn" onClick={() => navigate("/add-job")}>
              Add Job
            </button>
          </div>
        </div>

        <table className="jobs-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Status</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentJobs.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>

                <td>{job.position}</td>

                <td>
                  <span className={`status-badge ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>

                <td>
                  {job.website ? (
                    <a
                      href={job.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="open-btn"
                    >
                      Open
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/job/${job._id}`)}
                    >
                      View
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit-job/${job._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Jobs;
