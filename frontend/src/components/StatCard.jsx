export default function StatCard({ label, value, helperText }) {
  return (
    <article className="stat-card">
      <p className="stat-card__label">{label}</p>
      <h3>{value}</h3>
      {helperText ? <span className="stat-card__helper">{helperText}</span> : null}
    </article>
  );
}
