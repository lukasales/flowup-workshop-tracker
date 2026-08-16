import { USE_MOCKS, mockModeError } from './sourceConfig';
import { colaboradoresMock } from '../mocks/colaboradores';

export async function listarColaboradores() {
  if (!USE_MOCKS) {
    throw new Error(mockModeError);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...colaboradoresMock]);
    }, 300);
  });
}
