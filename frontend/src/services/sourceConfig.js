const rawUseMocks = import.meta.env.VITE_USE_MOCKS;
const normalizedUseMocks = String(rawUseMocks ?? 'true').trim().toLowerCase();

export const USE_MOCKS = normalizedUseMocks !== 'false';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.info('[FlowUp env]', {
  rawUseMocks,
  normalizedUseMocks,
  USE_MOCKS,
  API_URL,
});

export const mockModeError = 'Integração com API será implementada na próxima etapa.';
