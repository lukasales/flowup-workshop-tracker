import { USE_MOCKS } from './sourceConfig';
import { colaboradoresMock } from '../mocks/colaboradores';
import { apiRequest } from './api';

export async function listarColaboradores() {
  if (USE_MOCKS) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...colaboradoresMock]);
      }, 300);
    });
  }

  return apiRequest('/Colaboradores', { auth: true });
}
