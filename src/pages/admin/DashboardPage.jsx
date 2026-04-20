import { useReceitas } from '../../hooks/useReceitas';
import { usePacientes } from '../../hooks/usePacientes';
import { LoadingSpinner } from '../../components/common/Feedback';
import Badge from '../../components/common/Badge';
import { SEGMENTOS } from '../../utils/helpers';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { receitas, loading: lr } = useReceitas();
  const { pacientes, loading: lp } = usePacientes();

  if (lr || lp) return <LoadingSpinner />;

  const publicadas = receitas.filter((r) => r.status === 'PUBLICADA').length;
  const ativas     = pacientes.filter((p) => p.status === 'ATIVA').length;

  const stats = [
    { label: 'Total de Receitas', value: receitas.length,  change: '↑ 3 esse mês' },
    { label: 'Publicadas',        value: publicadas,        change: 'Visíveis no site' },
    { label: 'Pacientes',         value: pacientes.length,  change: '↑ 2 essa semana' },
    { label: 'Pacientes Ativas',  value: ativas,            change: 'Em acompanhamento' },
  ];

  return (
    <div>
      <h2 className={styles.titulo}>Olá, Ana Beatriz 👋</h2>
      <p className={styles.sub}>Resumo do NutriReceitas</p>

      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statChange}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span className={styles.tableTitle}>Últimas receitas</span>
        </div>
        <table className={styles.table}>
          <thead><tr><th>Receita</th><th>Segmento</th><th>Calorias</th><th>Status</th></tr></thead>
          <tbody>
            {receitas.slice(0, 5).map((r) => (
              <tr key={r.id}>
                <td>🍽 {r.nome}</td>
                <td><Badge variant="verde">{SEGMENTOS().find((s) => s.value === r.segmento)?.label || r.segmento}</Badge></td>
                <td>{r.calorias} kcal</td>
                <td><Badge variant={r.status === 'PUBLICADA' ? 'verde' : 'yellow'}>{r.status === 'PUBLICADA' ? 'Publicada' : 'Rascunho'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span className={styles.tableTitle}>Últimas pacientes</span>
        </div>
        <table className={styles.table}>
          <thead><tr><th>Nome</th><th>Objetivo</th><th>Peso</th><th>Status</th></tr></thead>
          <tbody>
            {pacientes.slice(0, 5).map((p) => (
              <tr key={p.id}>
                <td>👩 {p.nome}</td>
                <td>{p.objetivo}</td>
                <td>{p.pesoAtual ? `${p.pesoAtual} kg` : '—'}</td>
                <td><Badge variant={p.status === 'ATIVA' ? 'verde' : 'gray'}>{p.status === 'ATIVA' ? 'Ativa' : 'Inativa'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
