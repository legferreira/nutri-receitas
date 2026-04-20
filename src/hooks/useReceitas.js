import { useState, useEffect, useCallback } from 'react';
import receitaService from '../services/receitaService';
import { useToast } from '../context/ToastContext';

export function useReceitas(params = {}) {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await receitaService.listar(params);
      setReceitas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const criar = async (dados) => {
    const nova = await receitaService.criar(dados);
    setReceitas((prev) => [...prev, nova]);
    showToast('Receita criada com sucesso!');
    return nova;
  };

  const atualizar = async (id, dados) => {
    const atualizada = await receitaService.atualizar(id, dados);
    setReceitas((prev) => prev.map((r) => (r.id === id ? atualizada : r)));
    showToast('Receita atualizada com sucesso!');
    return atualizada;
  };

  const excluir = async (id) => {
    await receitaService.excluir(id);
    setReceitas((prev) => prev.filter((r) => r.id !== id));
    showToast('Receita excluída.');
  };

  return { receitas, loading, error, carregar, criar, atualizar, excluir };
}
