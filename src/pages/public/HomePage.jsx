import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import { SEGMENTOS } from '../../utils/helpers';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>✦ Nutrição com propósito</span>
          <h1 className={styles.heroTitle}>
            Receitas que <em>transformam</em> sua rotina
          </h1>
          <p className={styles.heroDesc}>
            Culinária saudável pensada para mulheres que buscam equilíbrio —
            da primeira refeição do dia à ceia, com sabor e leveza.
          </p>
          <button className={styles.heroBtn} onClick={() => navigate('/receitas')}>
            Explorar receitas →
          </button>
        </div>
      </section>

      <section className={styles.segmentos}>
        <h2 className={styles.secTitle}>Escolha seu momento</h2>
        <p className={styles.secSub}>Receitas organizadas para cada hora do seu dia</p>
        <div className={styles.grid}>
          {SEGMENTOS().map((seg) => (
            <button
              key={seg.value}
              className={styles.segCard}
              onClick={() => navigate(`/receitas?segmento=${seg.value}`)}
            >
              <span className={styles.segEmoji}>{seg.emoji}</span>
              <div>
                <p className={styles.segNome}>{seg.label}</p>
                <span className={styles.segBadge}>Ver receitas →</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
