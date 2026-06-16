function StatCard({ icon, title, count, color }) {
  return (
    <div
      className="stat-card"
      style={{
        "--card-color": color,
      }}
    >
      <div
        className="card-icon"
        style={{
          backgroundColor: color,
        }}
      >
        {icon}
      </div>

      <h2>{count}</h2>

      <p>{title}</p>
    </div>
  );
}

export default StatCard;
