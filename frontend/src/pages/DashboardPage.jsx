import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import WorkshopsByCollaboratorChart from '../charts/WorkshopsByCollaboratorChart';
import ParticipantsByWorkshopChart from '../charts/ParticipantsByWorkshopChart';
import { listarColaboradores } from '../services/colaboradoresService';
import { listarWorkshops } from '../services/workshopsService';
import { getParticipantsByWorkshop, getWorkshopsByCollaborator } from '../utils/participationMetrics';

export default function DashboardPage() {
  const [colaboradores, setColaboradores] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function carregarDados() {
      try {
        const [listaColaboradores, listaWorkshops] = await Promise.all([
          listarColaboradores(),
          listarWorkshops(),
        ]);

        if (isMounted) {
          setColaboradores(listaColaboradores);
          setWorkshops(listaWorkshops);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao carregar dados do dashboard.');
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

  const totalParticipacoes = useMemo(
    () => workshops.reduce((total, workshop) => total + workshop.colaboradores.length, 0),
    [workshops]
  );

  const workshopsByCollaborator = useMemo(
    () => getWorkshopsByCollaborator(colaboradores, workshops),
    [colaboradores, workshops]
  );

  const participantsByWorkshop = useMemo(
    () => getParticipantsByWorkshop(workshops),
    [workshops]
  );

  if (isLoading) {
    return (
      <div className="page-shell">
        <PageHeader
          title="Visão geral dos workshops"
          description="Acompanhe a participação dos colaboradores nos encontros trimestrais."
        />
        <LoadingState message="Carregando painel de workshops..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-shell">
        <PageHeader
          title="Visão geral dos workshops"
          description="Acompanhe a participação dos colaboradores nos encontros trimestrais."
        />
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <PageHeader
        title="Visão geral dos workshops"
        description="Acompanhe a participação dos colaboradores nos encontros trimestrais."
      />

      <section className="stats-grid" aria-label="Resumo geral">
        <StatCard label="Total de colaboradores" value={colaboradores.length} helperText="Pessoas registradas" />
        <StatCard label="Total de workshops" value={workshops.length} helperText="Encontros realizados" />
        <StatCard
          label="Total de participações registradas"
          value={totalParticipacoes}
          helperText="Presenças confirmadas"
        />
      </section>

      <section className="chart-grid" aria-label="Gráficos de acompanhamento">
        <WorkshopsByCollaboratorChart data={workshopsByCollaborator} />
        <ParticipantsByWorkshopChart data={participantsByWorkshop} />
      </section>
    </div>
  );
}
