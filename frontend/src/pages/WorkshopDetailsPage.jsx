import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import { obterWorkshopPorId } from '../services/workshopsService';
import { formatWorkshopDateTime } from '../utils/dateFormat';

export default function WorkshopDetailsPage() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function carregarWorkshop() {
      try {
        const data = await obterWorkshopPorId(id);

        if (isMounted) {
          setWorkshop(data);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao carregar workshop.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    carregarWorkshop();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <LoadingState message="Carregando workshop..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!workshop) {
    return (
      <div className="page-shell">
        <Link to="/workshops" className="back-link">← Voltar para workshops</Link>
        <EmptyState
          title="Workshop não encontrado"
          description="O workshop solicitado não existe ou foi removido."
        />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Link to="/workshops" className="back-link">← Voltar para workshops</Link>

      <article className="detail-card">
        <header className="detail-card__header">
          <div>
            <p className="eyebrow">Detalhes do workshop</p>
            <h1>{workshop.nome}</h1>
          </div>
          <span className="pill pill--strong">{workshop.colaboradores.length} participantes</span>
        </header>

        <div className="detail-meta">
          <p>
            <strong>Data e horário:</strong> {formatWorkshopDateTime(workshop.dataRealizacao)}
          </p>
          <p>
            <strong>Descrição:</strong> {workshop.descricao}
          </p>
        </div>
      </article>

      <section className="card-panel">
        <h2>Colaboradores presentes</h2>

        {workshop.colaboradores.length === 0 ? (
          <EmptyState
            title="Sem participantes registrados"
            description="Nenhum colaborador foi associado a este workshop."
          />
        ) : (
          <div className="chip-list" aria-label="Lista de colaboradores presentes">
            {workshop.colaboradores.map((colaborador) => (
              <span key={colaborador.id} className="chip">
                {colaborador.nome}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
