export default function PageHeader({ title, description }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">FlowUp</p>
        <h1>{title}</h1>
      </div>
      {description ? <p className="page-header__description">{description}</p> : null}
    </header>
  );
}
