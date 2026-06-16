import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  FaBriefcase,
  FaPaperPlane,
  FaUserTie,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    rejected: 0,
    accepted: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  const chartData = [
    {
      name: "Applied",
      count: stats.applied,
      fill: "#60A5FA",
    },
    {
      name: "Interview",
      count: stats.interview,
      fill: "#F59E0B",
    },
    {
      name: "Rejected",
      count: stats.rejected,
      fill: "#EF4444",
    },
    {
      name: "Accepted",
      count: stats.accepted,
      fill: "#10B981",
    },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/jobs");

      const jobs = res.data;

      const latestJobs = [...jobs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

      setRecentJobs(latestJobs);

      const upcoming = jobs
        .filter(
          (job) =>
            job.interviewDate && new Date(job.interviewDate) >= new Date(),
        )
        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
        .slice(0, 3);

      setUpcomingInterviews(upcoming);

      setStats({
        total: jobs.length,

        applied: jobs.filter((job) => job.status?.toLowerCase() === "applied")
          .length,

        interview: jobs.filter(
          (job) => job.status?.toLowerCase() === "interview",
        ).length,

        rejected: jobs.filter((job) => job.status?.toLowerCase() === "rejected")
          .length,

        accepted: jobs.filter((job) => job.status?.toLowerCase() === "accepted")
          .length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="stats-grid">
        <StatCard
          icon={<FaBriefcase />}
          title="Total Applications"
          count={stats.total}
          color="#2563eb"
        />

        <StatCard
          icon={<FaPaperPlane />}
          title="Applied"
          count={stats.applied}
          color="#60A5FA"
        />

        <StatCard
          icon={<FaUserTie />}
          title="Interview"
          count={stats.interview}
          color="#F59E0B"
        />

        <StatCard
          icon={<FaTimesCircle />}
          title="Rejected"
          count={stats.rejected}
          color="#EF4444"
        />

        <StatCard
          icon={<FaCheckCircle />}
          title="Accepted"
          count={stats.accepted}
          color="#10B981"
        />
      </div>

      <div className="dashboard-bottom">
        <div className="chart-card">
          <h3>Application Status Trend</h3>

          <ResponsiveContainer width="92%" height={420}>
            <BarChart
              data={chartData}
              margin={{
                top: 40,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis
                dataKey="name"
                axisLine={{
                  stroke: "#64748b",
                  strokeWidth: 2,
                }}
                tickLine={{
                  stroke: "#64748b",
                }}
                tick={{
                  fill: "#1e293b",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              />

              <YAxis
                axisLine={{
                  stroke: "#64748b",
                  strokeWidth: 2,
                }}
                tickLine={{
                  stroke: "#64748b",
                }}
                tick={{
                  fill: "#1e293b",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(37,99,235,0.08)",
                }}
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid #cbd5e1",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                }}
              />

              <Bar
                dataKey="count"
                animationDuration={1800}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="activity-card">
          <h3>Recent Activity</h3>

          {recentJobs.length > 0 ? (
            recentJobs.map((job) => (
              <div className="activity-item" key={job._id}>
                <h4>
                  <span className="company-dot">●</span> {job.company}
                </h4>
                <div className="activity-meta">
                  <span className={`status-badge ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>

                  <span className="activity-date">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>{" "}
              </div>
            ))
          ) : (
            <p>No recent activity</p>
          )}
        </div>
      </div>

      <div className="activity-card" style={{ marginTop: "25px" }}>
        <h3>Upcoming Interviews</h3>

        {upcomingInterviews.length > 0 ? (
          upcomingInterviews.map((job) => (
            <div key={job._id} className="activity-item">
              <h4>
                <span className="company-dot">•</span> {job.company}
              </h4>

              <div className="interview-position-row">
                <span className="position-label">Position :</span>
                <span className="interview-position">{job.position}</span>
              </div>

              <div className="interview-meta">
                <div>
                  <span className="meta-label">Date :</span>
                  <span className="interview-date">
                    {new Date(job.interviewDate).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <span className="meta-label">Time :</span>
                  <span className="interview-time">{job.interviewTime}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming interviews</p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
