import { USE_MOCKS, mockModeError } from './sourceConfig';
import { workshopsMock } from '../mocks/workshops';

export async function listarWorkshops() {
  if (!USE_MOCKS) {
    throw new Error(mockModeError);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...workshopsMock]);
    }, 350);
  });
}

export async function obterWorkshopPorId(id) {
  if (!USE_MOCKS) {
    throw new Error(mockModeError);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const workshop = workshopsMock.find((item) => item.id === Number(id));
      resolve(workshop ? { ...workshop, colaboradores: [...workshop.colaboradores] } : null);
    }, 300);
  });
}
