import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { listarColaboradores } from '../services/colaboradoresService';

export default function ColaboradoresPage() {
  const [colaboradores, setColaboradores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function carregarDados() {
      try {
        const data = await listarColaboradores();
        if (isMounted) {
          setColaboradores(data);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao carregar colaboradores.');
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
        title="Colaboradores"
        description="Pessoas cadastradas para participação nos workshops."
      />

      {isLoading ? (
        <LoadingState message="Carregando colaboradores..." />
      ) : error ? (
        <ErrorState message={error} />
      ) : colaboradores.length === 0 ? (
        <EmptyState
          title="Nenhum colaborador encontrado"
          description="Ainda não há registros para exibir."
        />
      ) : (
        <section className="card-panel">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                </tr>
              </thead>
              <tbody>
                {colaboradores.map((colaborador) => (
                  <tr key={colaborador.id}>
                    <td>{colaborador.id}</td>
                    <td>{colaborador.nome}</td>
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
