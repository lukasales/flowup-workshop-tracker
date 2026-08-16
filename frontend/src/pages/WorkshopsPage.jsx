import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { listarWorkshops } from '../services/workshopsService';
import { formatWorkshopDate } from '../utils/dateFormat';

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function carregarDados() {
      try {
        const data = await listarWorkshops();
        if (isMounted) {
          setWorkshops(data);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao carregar workshops.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    carregarDados();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page-shell">
      <PageHeader
        title="Workshops"
        description="Encontros trimestrais e quantidade de participantes registrados."
      />

      {isLoading ? (
        <LoadingState message="Carregando workshops..." />
      ) : error ? (
        <ErrorState message={error} />
      ) : workshops.length === 0 ? (
        <EmptyState
          title="Nenhum workshop encontrado"
          description="Ainda não há workshops cadastrados para exibir."
        />
      ) : (
        <section className="card-panel">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Workshop</th>
                  <th scope="col">Data</th>
                  <th scope="col">Participantes</th>
                </tr>
              </thead>
              <tbody>
                {workshops.map((workshop) => (
                  <tr key={workshop.id}>
                    <td>
                      <Link to={`/workshops/${workshop.id}`} className="table-link">
                        {workshop.nome}
                      </Link>
                    </td>
                    <td>{formatWorkshopDate(workshop.dataRealizacao)}</td>
                    <td>
                      <span className="pill">{workshop.colaboradores.length} participantes</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
