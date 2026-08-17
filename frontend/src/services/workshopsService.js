import { USE_MOCKS } from './sourceConfig';
import { workshopsMock } from '../mocks/workshops';
import { apiRequest } from './api';

export async function listarWorkshops() {
  if (USE_MOCKS) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...workshopsMock]);
      }, 350);
    });
  }

  return apiRequest('/Workshops', { auth: true });
}

export async function obterWorkshopPorId(id) {
  if (USE_MOCKS) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const workshop = workshopsMock.find((item) => item.id === Number(id));
        resolve(workshop ? { ...workshop, colaboradores: [...workshop.colaboradores] } : null);
      }, 300);
    });
  }

  try {
    return await apiRequest(`/Workshops/${id}`, { auth: true });
  } catch (error) {
    if (error && error.status === 404) {
      return null;
    }
    throw error;
  }
}
