import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

/**
 * Hook genérico de CRUD — elimina duplicação entre useReceitas e usePacientes.
 * @param {object} service - Objeto com métodos listar, criar, atualizar, excluir
 * @param {object} params  - Parâmetros de query opcionais
 */
export function useCRUD(service, params = {}) {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const { showToast }       = useToast();

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await service.listar(params);
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => { carregar(); }, [carregar]);

  const criar = async (dados, mensagem = 'Criado com sucesso!') => {
    const novo = await service.criar(dados);
    setItems((prev) => [...prev, novo]);
    showToast(mensagem);
    return novo;
  };

  const atualizar = async (id, dados, mensagem = 'Atualizado com sucesso!') => {
    const atualizado = await service.atualizar(id, dados);
    setItems((prev) => prev.map((item) => (item.id === id ? atualizado : item)));
    showToast(mensagem);
    return atualizado;
  };

  const excluir = async (id, mensagem = 'Removido com sucesso.') => {
    await service.excluir(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast(mensagem);
  };

  return { items, loading, error, carregar, criar, atualizar, excluir };
}
