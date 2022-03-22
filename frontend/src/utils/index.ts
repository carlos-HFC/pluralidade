export * from './alert';
export * from './mask';

export function showPeriod(period: 'M' | 'T' | 'N') {
  return ({
    'M': 'Manhã',
    'T': 'Tarde',
    'N': 'Noite',
  })[period]
}