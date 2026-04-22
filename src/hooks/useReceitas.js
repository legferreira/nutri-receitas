import { useCRUD } from './useCRUD';
import receitaService from '../services/receitaService';

/**
 * Hook específico para Receitas — delega ao useCRUD genérico.
 */
export function useReceitas(params = {}) {
  const crud = useCRUD(receitaService, params);
  return {
    receitas: crud.items,
    loading:  crud.loading,
    error:    crud.error,
    carregar: crud.carregar,
    criar:    (dados) => crud.criar(dados, 'Receita criada com sucesso!'),
    atualizar:(id, dados) => crud.atualizar(id, dados, 'Receita atualizada!'),
    excluir:  (id) => crud.excluir(id, 'Receita excluída.'),
  };
}
