import api from './api';

const ENDPOINT = '/pacientes';

const pacienteService = {
  listar: (params = {}) =>
    api.get(ENDPOINT, { params }).then((res) => res.data),

  buscarPorId: (id) =>
    api.get(`${ENDPOINT}/${id}`).then((res) => res.data),

  criar: (dados) =>
    api.post(ENDPOINT, dados).then((res) => res.data),

  atualizar: (id, dados) =>
    api.put(`${ENDPOINT}/${id}`, dados).then((res) => res.data),

  excluir: (id) =>
    api.delete(`${ENDPOINT}/${id}`).then((res) => res.data),

  // Histórico de peso
  listarHistoricoPeso: (pacienteId) =>
    api.get(`${ENDPOINT}/${pacienteId}/historico-peso`).then((res) => res.data),

  adicionarRegistroPeso: (pacienteId, dados) =>
    api
      .post(`${ENDPOINT}/${pacienteId}/historico-peso`, dados)
      .then((res) => res.data),

  excluirRegistroPeso: (pacienteId, registroId) =>
    api
      .delete(`${ENDPOINT}/${pacienteId}/historico-peso/${registroId}`)
      .then((res) => res.data),
};

export default pacienteService;
