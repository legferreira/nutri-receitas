import { useState, useMemo } from 'react';
import ReceitaTabela from '../../components/receitas/ReceitaTabela';
import ReceitaForm from '../../components/receitas/ReceitaForm';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../../components/common/Feedback';
import { useReceitas } from '../../hooks/useReceitas';
import { useToast } from '../../context/ToastContext';
import styles from './AdminPage.module.css';
import { SEGMENTOS, TAGS_DIETETICAS } from '../../utils/helpers';

export default function ReceitasAdminPage() {
  const { receitas, loading, error, criar, atualizar, excluir } = useReceitas();
  const { showToast } = useToast();

  const [editando, setEditando]   = useState(null);   // null = fechado, {} = nova, {...} = editar
  const [saving, setSaving]       = useState(false);
  const [busca, setBusca]         = useState('');
  const [filtroSeg, setFiltroSeg] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroTag, setFiltroTag] = useState('');

  const filtradas = useMemo(() => {
    let lista = receitas;
    if (busca)       lista = lista.filter((r) => r.nome.toLowerCase().includes(busca.toLowerCase()));
    if (filtroSeg)   lista = lista.filter((r) => r.segmento === filtroSeg);
    if (filtroStatus)lista = lista.filter((r) => r.status === filtroStatus);
    if (filtroTag)   lista = lista.filter((r) => r.tagsDieteticas?.includes(filtroTag));
    return lista;
  }, [receitas, busca, filtroSeg, filtroStatus, filtroTag]);

  const handleSubmit = async (dados) => {
    setSaving(true);
    try {
      if (editando?.id) await atualizar(editando.id, dados);
      else              await criar(dados);
      setEditando(null);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Excluir esta receita?')) return;
    try { await excluir(id); }
    catch (err) { showToast(err.message, 'error'); }
  };

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div>
      <h2 className={styles.titulo}>Receitas</h2>
      <p className={styles.sub}>Gerencie o acervo completo de receitas</p>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.filtros}>
            <div className={styles.searchWrap}>
              <span>🔍</span>
              <input
                className={styles.searchInput}
                placeholder="Buscar por nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <select className={styles.select} value={filtroSeg} onChange={(e) => setFiltroSeg(e.target.value)}>
              <option value="">Todos os segmentos</option>
              {SEGMENTOS().map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <select className={styles.select} value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
              <option value="">Todos os status</option>
              <option value="PUBLICADA">Publicadas</option>
              <option value="RASCUNHO">Rascunhos</option>
            </select>
            <select className={styles.select} value={filtroTag} onChange={(e) => setFiltroTag(e.target.value)}>
              <option value="">Todas as tags</option>
              {TAGS_DIETETICAS().map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <Button variant="primary" size="sm" onClick={() => setEditando({})}>
            + Nova Receita
          </Button>
        </div>

        <div className={styles.count}>
          {filtradas.length} receita{filtradas.length !== 1 ? 's' : ''} encontrada{filtradas.length !== 1 ? 's' : ''}
        </div>

        {filtradas.length === 0
          ? <EmptyState title="Nenhuma receita encontrada" />
          : <ReceitaTabela receitas={filtradas} onEditar={setEditando} onExcluir={handleExcluir} />
        }
      </div>

      <Modal
        isOpen={editando !== null}
        onClose={() => setEditando(null)}
        title={editando?.id ? 'Editar Receita' : 'Nova Receita'}
        maxWidth="700px"
      >
        <ReceitaForm
          inicial={editando}
          onSubmit={handleSubmit}
          onCancel={() => setEditando(null)}
          loading={saving}
        />
      </Modal>
    </div>
  );
}
