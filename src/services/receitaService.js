import api from './api';

const ENDPOINT = '/receitas';

const receitaService = {
  /** Lista todas as receitas (área admin) */
  listar: (params = {}) =>
    api.get(ENDPOINT, { params }).then((res) => res.data),

  /** Lista apenas receitas publicadas (área pública) */
  listarPublicas: (params = {}) =>
    api.get(`${ENDPOINT}/publicas`, { params }).then((res) => res.data),

  buscarPorId: (id) =>
    api.get(`${ENDPOINT}/${id}`).then((res) => res.data),

  criar: (dados) =>
    api.post(ENDPOINT, dados).then((res) => res.data),

  atualizar: (id, dados) =>
    api.put(`${ENDPOINT}/${id}`, dados).then((res) => res.data),

  excluir: (id) =>
    api.delete(`${ENDPOINT}/${id}`).then((res) => res.data),
};

export default receitaService;
