import { useState, useEffect, useCallback } from 'react';
import pacienteService from '../services/pacienteService';
import { useToast } from '../context/ToastContext';

export function usePacientes(params = {}) {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pacienteService.listar(params);
      setPacientes(data);
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
    const novo = await pacienteService.criar(dados);
    setPacientes((prev) => [...prev, novo]);
    showToast('Paciente cadastrada com sucesso!');
    return novo;
  };

  const atualizar = async (id, dados) => {
    const atualizado = await pacienteService.atualizar(id, dados);
    setPacientes((prev) => prev.map((p) => (p.id === id ? atualizado : p)));
    showToast('Paciente atualizada com sucesso!');
    return atualizado;
  };

  const excluir = async (id) => {
    await pacienteService.excluir(id);
    setPacientes((prev) => prev.filter((p) => p.id !== id));
    showToast('Paciente removida.');
  };

  return { pacientes, loading, error, carregar, criar, atualizar, excluir };
}
