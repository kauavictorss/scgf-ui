export const ufsBrasil = [
  {nome: 'Acre', uf: 'AC'},
  {nome: 'Alagoas', uf: 'AL'},
  {nome: 'Amapá', uf: 'AP'},
  {nome: 'Amazonas', uf: 'AM'},
  {nome: 'Bahia', uf: 'BA'},
  {nome: 'Ceará', uf: 'CE'},
  {nome: 'Distrito Federal', uf: 'DF'},
  {nome: 'Espírito Santo', uf: 'ES'},
  {nome: 'Goiás', uf: 'GO'},
  {nome: 'Maranhão', uf: 'MA'},
  {nome: 'Mato Grosso', uf: 'MT'},
  {nome: 'Mato Grosso do Sul', uf: 'MS'},
  {nome: 'Minas Gerais', uf: 'MG'},
  {nome: 'Pará', uf: 'PA'},
  {nome: 'Paraíba', uf: 'PB'},
  {nome: 'Paraná', uf: 'PR'},
  {nome: 'Pernambuco', uf: 'PE'},
  {nome: 'Piauí', uf: 'PI'},
  {nome: 'Rio de Janeiro', uf: 'RJ'},
  {nome: 'Rio Grande do Norte', uf: 'RN'},
  {nome: 'Rio Grande do Sul', uf: 'RS'},
  {nome: 'Rondônia', uf: 'RO'},
  {nome: 'Roraima', uf: 'RR'},
  {nome: 'Santa Catarina', uf: 'SC'},
  {nome: 'São Paulo', uf: 'SP'},
  {nome: 'Sergipe', uf: 'SE'},
  {nome: 'Tocantins', uf: 'TO'}
];

export const ufsComSelecione = [
  {label: 'Selecione', value: ''},
  ...ufsBrasil.map((item) => ({label: `${item.nome} - ${item.uf}`, value: item.uf}))
];

const nomesEstadosPorUf = ufsBrasil.reduce((acumulado, item) => {
  acumulado[item.uf] = item.nome;
  return acumulado;
}, {});

export const formatarEstadoUf = (uf) => {
  const ufNormalizada = String(uf || '').trim().toUpperCase();
  if (!ufNormalizada) {
    return 'Não informado';
  }

  const estado = nomesEstadosPorUf[ufNormalizada];
  return estado ? `${estado} - ${ufNormalizada}` : ufNormalizada;
};
