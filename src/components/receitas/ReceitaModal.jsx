import Modal from '../common/Modal';
import styles from './ReceitaModal.module.css';
import { SEGMENTOS } from '../../utils/helpers';

const EMOJIS = {
  CAFE_MANHA: '🌅', ALMOCO: '☀️',
  LANCHE_SALGADO: '🥙', LANCHE_DOCE: '🍓',
  JANTAR: '🌙', CEIA: '⭐',
};

export default function ReceitaModal({ receita, onClose }) {
  if (!receita) return null;

  const segLabel = SEGMENTOS().find((s) => s.value === receita.segmento)?.label || receita.segmento;
  const emoji    = EMOJIS[receita.segmento] || '🍽';

  return (
    <Modal isOpen={!!receita} onClose={onClose} maxWidth="620px">
      <div className={styles.content}>
        <div className={styles.emoji}>{emoji}</div>
        <p className={styles.seg}>{segLabel}</p>
        <h2 className={styles.titulo}>{receita.nome}</h2>

        {receita.descricao && (
          <p className={styles.desc}>{receita.descricao}</p>
        )}

        {receita.tagsDieteticas?.length > 0 && (
          <div className={styles.tagsRow}>
            {receita.tagsDieteticas.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}

        <div className={styles.infoRow}>
          {[
            { val: receita.calorias ?? '—',                                           lab: 'kcal' },
            { val: receita.porcaoGramas      ? `${receita.porcaoGramas}g`      : '—', lab: 'porção' },
            { val: receita.tempoPreparo      ? `${receita.tempoPreparo}min`     : '—', lab: 'preparo' },
            { val: receita.rendimentoPorcoes ?? '—',                                   lab: 'porções' },
            { val: receita.dificuldade === 'FACIL' ? 'Fácil' : receita.dificuldade === 'MEDIO' ? 'Médio' : receita.dificuldade === 'DIFICIL' ? 'Difícil' : '—', lab: 'dificuldade' },
          ].map(({ val, lab }) => (
            <div key={lab} className={styles.infoItem}>
              <span className={styles.infoVal}>{val}</span>
              <span className={styles.infoLab}>{lab}</span>
            </div>
          ))}
        </div>

        <div className={styles.macrosRow}>
          {[
            { val: receita.proteinas    != null ? `${receita.proteinas}g`    : '—', lab: 'Proteínas' },
            { val: receita.carboidratos != null ? `${receita.carboidratos}g` : '—', lab: 'Carboidratos' },
            { val: receita.gorduras     != null ? `${receita.gorduras}g`     : '—', lab: 'Gorduras' },
          ].map(({ val, lab }) => (
            <div key={lab} className={styles.macro}>
              <span className={styles.macroVal}>{val}</span>
              <span className={styles.macroLab}>{lab}</span>
            </div>
          ))}
        </div>

        <h4 className={styles.sectionTitle}>Ingredientes</h4>
        <ul className={styles.ingredientes}>
          {receita.ingredientes?.map((item, i) => (
            <li key={i} className={styles.ingrediente}>{item}</li>
          ))}
        </ul>

        <h4 className={styles.sectionTitle}>Modo de Preparo</h4>
        <p className={styles.preparo}>{receita.modoPreparo}</p>
      </div>
    </Modal>
  );
}
