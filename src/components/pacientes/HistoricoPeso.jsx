import { useState } from 'react';
import { Input } from '../common/FormField';
import Button from '../common/Button';
import { formatarData } from '../../utils/helpers';
import styles from './HistoricoPeso.module.css';

export default function HistoricoPeso({ historico = [], onAdicionar, loadingAdd }) {
  const [data,  setData]  = useState('');
  const [peso,  setPeso]  = useState('');
  const [obs,   setObs]   = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!data || !peso) { setError('Preencha data e peso'); return; }
    setError('');
    onAdicionar({ data, peso: parseFloat(peso), observacao: obs });
    setData(''); setPeso(''); setObs('');
  };

  const ordenado = [...historico].sort((a, b) => new Date(b.data) - new Date(a.data));

  return (
    <div className={styles.wrapper}>
      {ordenado.length === 0 ? (
        <p className={styles.vazio}>Nenhum registro de peso ainda.</p>
      ) : (
        <div className={styles.lista}>
          {ordenado.map((reg, i) => {
            const prox  = ordenado[i + 1];
            const delta = prox ? (reg.peso - prox.peso).toFixed(1) : null;
            const neg   = delta && parseFloat(delta) < 0;
            return (
              <div key={reg.id || i} className={styles.item}>
                <div>
                  <div className={styles.itemData}>{formatarData(reg.data)}</div>
                  {reg.observacao && <div className={styles.itemObs}>{reg.observacao}</div>}
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.itemPeso}>{reg.peso} kg</div>
                  {delta && (
                    <span className={`${styles.delta} ${neg ? styles.neg : styles.pos}`}>
                      {parseFloat(delta) > 0 ? '+' : ''}{delta} kg
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.addForm}>
        <p className={styles.addTitle}>Adicionar registro</p>
        <div className={styles.addRow}>
          <Input id="h-data" label="Data" type="date" value={data} onChange={(e) => setData(e.target.value)} />
          <Input id="h-peso" label="Peso (kg)" type="number" step="0.1" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ex: 70.5" />
        </div>
        <Input id="h-obs" label="Observação" value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Ex: Após período de férias" />
        {error && <p className={styles.error}>{error}</p>}
        <Button variant="primary" size="sm" onClick={handleAdd} disabled={loadingAdd} style={{ marginTop: '.5rem' }}>
          {loadingAdd ? 'Salvando...' : '+ Adicionar'}
        </Button>
      </div>
    </div>
  );
}
