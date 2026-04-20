import { useState, useMemo } from 'react';
import PacienteTabela from '../../components/pacientes/PacienteTabela';
import PacienteForm from '../../components/pacientes/PacienteForm';
import PacienteModal from '../../components/pacientes/PacienteModal';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../../components/common/Feedback';
import { usePacientes } from '../../hooks/usePacientes';
import { useToast } from '../../context/ToastContext';
import pacienteService from '../../services/pacienteService';
import styles from './AdminPage.module.css';

export default function PacientesAdminPage() {
  const { pacientes, loading, error, criar, atualizar, excluir } = usePacientes();
  const { showToast } = useToast();

  const [editando, setEditando]       = useState(null);
  const [visualizando, setVisualizando] = useState(null);
  const [saving, setSaving]           = useState(false);
  const [busca, setBusca]             = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  const filtrados = useMemo(() => {
    let lista = pacientes;
    if (busca) lista = lista.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.email?.toLowerCase().includes(busca.toLowerCase())
    );
    if (filtroStatus) lista = lista.filter((p) => p.status === filtroStatus);
    return lista;
  }, [pacientes, busca, filtroStatus]);

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
    if (!window.confirm('Remover esta paciente?')) return;
    try { await excluir(id); }
    catch (err) { showToast(err.message, 'error'); }
  };

  const handleAdicionarPeso = async (pacienteId, dados) => {
    try {
      const atualizado = await pacienteService.adicionarRegistroPeso(pacienteId, dados);
      setVisualizando(atualizado);
      showToast('Registro de peso adicionado!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div>
      <h2 className={styles.titulo}>Pacientes</h2>
      <p className={styles.sub}>Gerencie sua carteira de pacientes</p>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.filtros}>
            <div className={styles.searchWrap}>
              <span>🔍</span>
              <input
                className={styles.searchInput}
                placeholder="Buscar por nome ou e-mail..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <select className={styles.select} value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
              <option value="">Todos os status</option>
              <option value="ATIVA">Ativas</option>
              <option value="INATIVA">Inativas</option>
            </select>
          </div>
          <Button variant="primary" size="sm" onClick={() => setEditando({})}>
            + Nova Paciente
          </Button>
        </div>

        <div className={styles.count}>
          {filtrados.length} paciente{filtrados.length !== 1 ? 's' : ''} encontrada{filtrados.length !== 1 ? 's' : ''}
        </div>

        {filtrados.length === 0
          ? <EmptyState icon="👩" title="Nenhuma paciente encontrada" />
          : <PacienteTabela
              pacientes={filtrados}
              onVer={setVisualizando}
              onEditar={setEditando}
              onExcluir={handleExcluir}
            />
        }
      </div>

      {/* Modal: form criar/editar */}
      <Modal
        isOpen={editando !== null}
        onClose={() => setEditando(null)}
        title={editando?.id ? 'Editar Paciente' : 'Nova Paciente'}
        maxWidth="680px"
      >
        <PacienteForm
          inicial={editando}
          onSubmit={handleSubmit}
          onCancel={() => setEditando(null)}
          loading={saving}
        />
      </Modal>

      {/* Modal: visualizar/histórico */}
      <PacienteModal
        paciente={visualizando}
        onClose={() => setVisualizando(null)}
        onAdicionarPeso={handleAdicionarPeso}
      />
    </div>
  );
}
