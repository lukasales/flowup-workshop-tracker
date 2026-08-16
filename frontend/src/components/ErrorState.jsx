export default function ErrorState({ message }) {
  return (
    <div className="state-card state-card--error" role="alert">
      <strong>Não foi possível carregar os dados.</strong>
      <p>{message}</p>
    </div>
  );
}
