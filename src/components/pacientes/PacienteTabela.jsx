import { useState, useMemo } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Input } from '../common/FormField';
import { EmptyState, LoadingSpinner, ErrorMessage } from '../common/Feedback';
import { calcularIdade, calcularIMC } from '../../utils/helpers';
import styles from './PacienteTabela.module.css';

export default function PacienteTabela({ pacientes, loading, error, onVer, onEditar, onExcluir, onNova }) {
  const [busca, setBusca] = useState('');

  const filtradas = useMemo(() =>
    pacientes.filter((p) =>
      !busca || p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.email?.toLowerCase().includes(busca.toLowerCase())
    ), [pacientes, busca]);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <Input id="busca-paciente" placeholder="🔍 Buscar por nome ou e-mail..." value={busca} onChange={(e) => setBusca(e.target.value)} style={{ maxWidth: '320px' }} />
        <Button variant="primary" onClick={onNova}>+ Nova Paciente</Button>
      </div>
      <p className={styles.count}>{filtradas.length} paciente{filtradas.length !== 1 ? 's' : ''}</p>
      {filtradas.length === 0 ? (
        <EmptyState icon="👩" title="Nenhuma paciente encontrada" message="Cadastre uma nova paciente para começar." />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr><th>Nome</th><th>Idade</th><th>Peso</th><th>IMC</th><th>Meta</th><th>Objetivo</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {filtradas.map((p) => {
                const idade = calcularIdade(p.dataNascimento);
                const imc   = calcularIMC(p.pesoAtual, p.altura);
                return (
                  <tr key={p.id}>
                    <td className={styles.nomeCell}>👩 {p.nome}</td>
                    <td>{idade ? `${idade}a` : '—'}</td>
                    <td>{p.pesoAtual ? `${p.pesoAtual} kg` : '—'}</td>
                    <td>{imc || '—'}</td>
                    <td>{p.pesoMeta ? `${p.pesoMeta} kg` : '—'}</td>
                    <td><Badge variant="verde">{p.objetivo}</Badge></td>
                    <td><Badge variant={p.status === 'ATIVA' ? 'verde' : 'gray'}>{p.status === 'ATIVA' ? 'Ativa' : 'Inativa'}</Badge></td>
                    <td>
                      <div className={styles.acoes}>
                        <Button size="sm" variant="ghost"     onClick={() => onVer(p)}>📋 Ver</Button>
                        <Button size="sm" variant="secondary" onClick={() => onEditar(p)}>Editar</Button>
                        <Button size="sm" variant="danger"    onClick={() => onExcluir(p.id)}>Excluir</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
