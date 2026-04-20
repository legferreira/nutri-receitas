export function calcularIMC(pesoKg, alturaCm) {
  if (!pesoKg || !alturaCm) return null;
  const alturaM = alturaCm / 100;
  return (pesoKg / (alturaM * alturaM)).toFixed(1);
}

export function classificarIMC(imc) {
  const v = parseFloat(imc);
  if (!v) return null;
  if (v < 18.5) return { label: 'Abaixo do peso', color: '#3498db' };
  if (v < 25)   return { label: 'Peso normal', color: '#2ecc71' };
  if (v < 30)   return { label: 'Sobrepeso', color: '#f39c12' };
  return        { label: 'Obesidade', color: '#e74c3c' };
}

export function formatarData(dataStr) {
  if (!dataStr) return '—';
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia}/${mes}/${ano}`;
}

export function calcularIdade(dataNasc) {
  if (!dataNasc) return null;
  const hoje = new Date();
  const nasc = new Date(dataNasc);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

export function SEGMENTOS() {
  return [
    { value: 'CAFE_MANHA',    label: 'Café da Manhã',   emoji: '🌅' },
    { value: 'ALMOCO',        label: 'Almoço',           emoji: '☀️' },
    { value: 'LANCHE_SALGADO',label: 'Lanche Salgado',  emoji: '🥙' },
    { value: 'LANCHE_DOCE',   label: 'Lanche Doce',     emoji: '🍓' },
    { value: 'JANTAR',        label: 'Jantar',           emoji: '🌙' },
    { value: 'CEIA',          label: 'Ceia',             emoji: '⭐' },
  ];
}

export function TAGS_DIETETICAS() {
  return [
    'Sem Glúten',
    'Sem Lactose',
    'Vegetariana',
    'Vegana',
    'Low Carb',
    'Rica em Proteína',
  ];
}

export function RESTRICOES_ALIMENTARES() {
  return [
    'Sem Glúten',
    'Sem Lactose',
    'Vegetariana',
    'Vegana',
    'Alergia a frutos do mar',
    'Alergia a amendoim',
    'Diabética',
    'Hipertensa',
  ];
}

export function OBJETIVOS_PACIENTE() {
  return [
    'Emagrecimento',
    'Reeducação alimentar',
    'Ganho de massa muscular',
    'Manutenção de peso',
  ];
}
