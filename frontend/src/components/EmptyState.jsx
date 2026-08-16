export default function EmptyState({ title, description }) {
  return (
    <div className="state-card state-card--empty">
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}
