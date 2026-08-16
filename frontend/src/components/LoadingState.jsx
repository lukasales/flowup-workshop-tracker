export default function LoadingState({ message = 'Carregando...' }) {
  return (
    <div className="state-card" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
