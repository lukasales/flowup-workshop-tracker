import { describe, expect, it } from 'vitest';
import { getParticipantsByWorkshop, getWorkshopsByCollaborator } from './participationMetrics';

describe('participationMetrics', () => {
  it('getWorkshopsByCollaborator returns the expected workshop counts per collaborator', () => {
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

    const result = getWorkshopsByCollaborator(colaboradores, workshops).map((item) => item.quantidade);

    expect(result).toEqual([4, 3, 3, 4, 3, 2, 2, 3]);
  });

  it('getParticipantsByWorkshop returns the quantity of participants per workshop', () => {
    const workshops = [
      { id: 1, nome: 'Workshop 1', colaboradores: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }] },
      { id: 2, nome: 'Workshop 2', colaboradores: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 7 }, { id: 8 }] },
      { id: 3, nome: 'Workshop 3', colaboradores: [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 8 }] },
      { id: 4, nome: 'Workshop 4', colaboradores: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 6 }, { id: 7 }, { id: 8 }] },
    ];

    const result = getParticipantsByWorkshop(workshops).map((item) => item.quantidade);

    expect(result).toEqual([6, 7, 5, 6]);
  });
});
