import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DashboardPage from './DashboardPage';

const colaboradores = [
  { id: 1, nome: 'Ana' },
  { id: 2, nome: 'Bruno' },
  { id: 3, nome: 'Carla' },
  { id: 4, nome: 'Daniel' },
  { id: 5, nome: 'Elisa' },
  { id: 6, nome: 'Felipe' },
  { id: 7, nome: 'Gabriela' },
  { id: 8, nome: 'Henrique' },
];

const workshops = [
  { id: 1, nome: 'Workshop 1', colaboradores: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }] },
  { id: 2, nome: 'Workshop 2', colaboradores: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 7 }, { id: 8 }] },
  { id: 3, nome: 'Workshop 3', colaboradores: [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 8 }] },
  { id: 4, nome: 'Workshop 4', colaboradores: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 6 }, { id: 7 }, { id: 8 }] },
];

vi.mock('../charts/WorkshopsByCollaboratorChart', () => ({
  default: () => <div data-testid="workshops-chart" />,
}));

vi.mock('../charts/ParticipantsByWorkshopChart', () => ({
  default: () => <div data-testid="participants-chart" />,
}));

vi.mock('../services/colaboradoresService', () => ({
  listarColaboradores: vi.fn(async () => colaboradores),
}));

vi.mock('../services/workshopsService', () => ({
  listarWorkshops: vi.fn(async () => workshops),
}));

describe('DashboardPage', () => {
  it('renders the dashboard summary cards in mock mode', async () => {
    render(<DashboardPage />);

    expect(await screen.findByText('Total de colaboradores')).toBeInTheDocument();
    expect(screen.getByText('Total de workshops')).toBeInTheDocument();
    expect(screen.getByText('Total de participações registradas')).toBeInTheDocument();
  });
});
