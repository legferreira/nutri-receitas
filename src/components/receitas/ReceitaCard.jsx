import Badge from '../common/Badge';
import styles from './ReceitaCard.module.css';
import { SEGMENTOS } from '../../utils/helpers';

const EMOJIS = {
  CAFE_MANHA: '🌅', ALMOCO: '☀️',
  LANCHE_SALGADO: '🥙', LANCHE_DOCE: '🍓',
  JANTAR: '🌙', CEIA: '⭐',
};

export default function ReceitaCard({ receita, onClick }) {
  const segLabel = SEGMENTOS().find((s) => s.value === receita.segmento)?.label || receita.segmento;
  const emoji    = EMOJIS[receita.segmento] || '🍽';

  return (
    <article className={styles.card} onClick={() => onClick?.(receita)}>
      <div className={styles.img}>
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.statusBadge}>✓ Publicada</span>
      </div>

      <div className={styles.body}>
        <p className={styles.seg}>{segLabel}</p>
        <h3 className={styles.nome}>{receita.nome}</h3>

        <div className={styles.meta}>
          {receita.tempoPreparo      && <span>⏱ {receita.tempoPreparo}min</span>}
          {receita.calorias          && <span>🔥 {receita.calorias}kcal</span>}
          {receita.rendimentoPorcoes && <span>🍽 {receita.rendimentoPorcoes} porç.</span>}
        </div>

        {receita.tagsDieteticas?.length > 0 && (
          <div className={styles.tags}>
            {receita.tagsDieteticas.map((t) => (
              <span key={t} className={styles.tagDieta}>{t}</span>
            ))}
          </div>
        )}

        <Badge variant={receita.dificuldade === 'FACIL' ? 'verde' : 'terracota'}>
          {receita.dificuldade === 'FACIL' ? 'Fácil' : receita.dificuldade === 'MEDIO' ? 'Médio' : 'Difícil'}
        </Badge>
      </div>
    </article>
  );
}
