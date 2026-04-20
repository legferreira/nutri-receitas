import { useState } from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Input } from '../common/FormField';
import styles from './PacienteModal.module.css';
import { calcularIMC, calcularIdade, classificarIMC, formatarData } from '../../utils/helpers';

const TABS = ['Dados', 'Histórico de Peso', 'Restrições'];

export default function PacienteModal({ paciente, onClose, onAdicionarPeso }) {
  const [tab, setTab]         = useState(0);
  const [novoPeso, setNovoPeso] = useState({ data: '', peso: '', observacao: '' });

  if (!paciente) return null;

  const imc          = calcularIMC(paciente.pesoAtual, paciente.altura);
  const imcInfo      = classificarIMC(imc);
  const idade        = calcularIdade(paciente.dataNascimento);
  const iniciais     = paciente.nome.split(' ').slice(0, 2).map((w) => w[0]).join('');
  const historico    = [...(paciente.historicoPeso || [])].reverse();

  const handleAddPeso = () => {
    if (!novoPeso.data || !novoPeso.peso) return;
    onAdicionarPeso?.(paciente.id, {
      data:       novoPeso.data,
      peso:       Number(novoPeso.peso),
      observacao: novoPeso.observacao,
    });
    setNovoPeso({ data: '', peso: '', observacao: '' });
  };

  return (
    <Modal isOpen={!!paciente} onClose={onClose} maxWidth="580px">
      {/* Cabeçalho */}
      <div className={styles.header}>
        <div className={styles.avatar}>{iniciais}</div>
        <div>
          <h3 className={styles.nome}>{paciente.nome}</h3>
          <Badge variant={paciente.status === 'ATIVA' ? 'verde' : 'gray'}>
            {paciente.status === 'ATIVA' ? 'Ativa' : 'Inativa'}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {TABS.map((t, i) => (
          <button
            key={t}
            className={`${styles.tab} ${tab === i ? styles.tabActive : ''}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab: Dados */}
      {tab === 0 && (
        <div className={styles.infoGrid}>
          {[
            { l: 'Data de Nascimento', v: formatarData(paciente.dataNascimento) },
            { l: 'Idade',              v: idade != null ? `${idade} anos` : '—' },
            { l: 'E-mail',             v: paciente.email || '—' },
            { l: 'WhatsApp',           v: paciente.telefone || '—' },
            { l: 'Peso Atual',         v: `${paciente.pesoAtual} kg` },
            { l: 'Altura',             v: `${paciente.altura} cm` },
            { l: 'IMC',                v: imc ? `${imc} — ${imcInfo?.label}` : '—' },
            { l: 'Peso Meta',          v: paciente.pesoMeta ? `${paciente.pesoMeta} kg` : '—' },
            { l: 'Objetivo',           v: paciente.objetivo },
            { l: '1ª Consulta',        v: formatarData(paciente.dataConsulta) },
          ].map(({ l, v }) => (
            <div key={l} className={styles.infoItem}>
              <span className={styles.infoLabel}>{l}</span>
              <span className={styles.infoVal}>{v}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Histórico de Peso */}
      {tab === 1 && (
        <div>
          <div className={styles.historicoList}>
            {historico.length === 0 && (
              <p className={styles.empty}>Nenhum registro ainda</p>
            )}
            {historico.map((h, i) => {
              const prev  = historico[i + 1];
              const delta = prev ? (h.peso - prev.peso).toFixed(1) : null;
              return (
                <div key={i} className={styles.historicoItem}>
                  <div>
                    <div className={styles.historicoData}>{formatarData(h.data)}</div>
                    {h.observacao && <div className={styles.historicoObs}>{h.observacao}</div>}
                  </div>
                  <div className={styles.historicoRight}>
                    <span className={styles.historicoPeso}>{h.peso} kg</span>
                    {delta && (
                      <span className={parseFloat(delta) < 0 ? styles.deltaNeg : styles.deltaPos}>
                        {parseFloat(delta) > 0 ? '+' : ''}{delta} kg
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.addPeso}>
            <p className={styles.addPesoTitle}>Adicionar registro</p>
            <div className={styles.addPesoRow}>
              <Input id="h-data" type="date" label="Data"
                value={novoPeso.data}
                onChange={(e) => setNovoPeso((p) => ({ ...p, data: e.target.value }))}
              />
              <Input id="h-peso" type="number" step="0.1" label="Peso (kg)" placeholder="Ex: 70.5"
                value={novoPeso.peso}
                onChange={(e) => setNovoPeso((p) => ({ ...p, peso: e.target.value }))}
              />
            </div>
            <Input id="h-obs" label="Observação" placeholder="Ex: Após férias"
              value={novoPeso.observacao}
              onChange={(e) => setNovoPeso((p) => ({ ...p, observacao: e.target.value }))}
            />
            <Button variant="primary" size="sm" onClick={handleAddPeso} style={{ marginTop: '.5rem' }}>
              + Adicionar
            </Button>
          </div>
        </div>
      )}

      {/* Tab: Restrições */}
      {tab === 2 && (
        <div className={styles.restricoes}>
          {paciente.restricoesAlimentares?.length > 0
            ? paciente.restricoesAlimentares.map((r) => (
                <Badge key={r} variant="terracota">{r}</Badge>
              ))
            : <p className={styles.empty}>Nenhuma restrição cadastrada</p>
          }
          {paciente.observacoes && (
            <div className={styles.obs}>
              <strong>Observações: </strong>{paciente.observacoes}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
