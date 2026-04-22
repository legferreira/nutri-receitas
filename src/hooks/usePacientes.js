import { useCRUD } from './useCRUD';
import pacienteService from '../services/pacienteService';

/**
 * Hook específico para Pacientes — delega ao useCRUD genérico.
 */
export function usePacientes(params = {}) {
  const crud = useCRUD(pacienteService, params);
  return {
    pacientes: crud.items,
    loading:   crud.loading,
    error:     crud.error,
    carregar:  crud.carregar,
    criar:     (dados) => crud.criar(dados, 'Paciente cadastrada com sucesso!'),
    atualizar: (id, dados) => crud.atualizar(id, dados, 'Paciente atualizada!'),
    excluir:   (id) => crud.excluir(id, 'Paciente removida.'),
  };
}
