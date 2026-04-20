import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReceitaCard from '../../components/receitas/ReceitaCard';
import ReceitaModal from '../../components/receitas/ReceitaModal';
import { LoadingSpinner, EmptyState, ErrorMessage } from '../../components/common/Feedback';
import { useReceitas } from '../../hooks/useReceitas';
import { SEGMENTOS, TAGS_DIETETICAS } from '../../utils/helpers';
import styles from './ReceitasPage.module.css';

export default function ReceitasPage() {
  const [searchParams] = useSearchParams();
  const { receitas, loading, error } = useReceitas();
  const [busca,       setBusca]      = useState('');
  const [segFilt,     setSegFilt]    = useState(searchParams.get('segmento') || 'TODOS');
  const [tagFilt,     setTagFilt]    = useState('TODOS');
  const [selecionada, setSelecionada] = useState(null);

  useEffect(() => {
    const seg = searchParams.get('segmento');
    if (seg) setSegFilt(seg);
  }, [searchParams]);

  const publicas   = useMemo(() => receitas.filter((r) => r.status === 'PUBLICADA'), [receitas]);
  const filtradas  = useMemo(() => publicas.filter((r) => {
    const matchSeg   = segFilt === 'TODOS' || r.segmento === segFilt;
    const matchTag   = tagFilt === 'TODOS' || r.tagsDieteticas?.includes(tagFilt);
    const matchBusca = !busca || r.nome.toLowerCase().includes(busca.toLowerCase()) ||
      r.descricao?.toLowerCase().includes(busca.toLowerCase()) ||
      r.ingredientes?.some((i) => i.toLowerCase().includes(busca.toLowerCase()));
    return matchSeg && matchTag && matchBusca;
  }), [publicas, segFilt, tagFilt, busca]);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div className={styles.page}>
      <h2 className={styles.titulo}>Receitas</h2>
      <p className={styles.sub}>Filtre pelo seu momento do dia</p>

      <div className={styles.buscaRow}>
        <div className={styles.buscaWrapper}>
          <span className={styles.buscaIcon}>🔍</span>
          <input className={styles.buscaInput} placeholder="Buscar por nome, ingrediente..." value={busca} onChange={(e) => setBusca(e.target.value)} />
          {busca && <button className={styles.buscaClear} onClick={() => setBusca('')}>✕</button>}
        </div>
        {(busca || segFilt !== 'TODOS' || tagFilt !== 'TODOS') && (
          <span className={styles.buscaCount}>{filtradas.length} de {publicas.length} receitas</span>
        )}
      </div>

      <div className={styles.filtros}>
        <button className={`${styles.filtroBtn} ${segFilt === 'TODOS' ? styles.ativo : ''}`} onClick={() => setSegFilt('TODOS')}>Todos</button>
        {SEGMENTOS().map((s) => (
          <button key={s.value} className={`${styles.filtroBtn} ${segFilt === s.value ? styles.ativo : ''}`} onClick={() => setSegFilt(s.value)}>{s.emoji} {s.label}</button>
        ))}
      </div>

      <div className={styles.tagFiltros}>
        <span className={styles.tagFiltrosLabel}>Características:</span>
        <div className={styles.tagFiltrosGroup}>
          <button className={`${styles.tagBtn} ${tagFilt === 'TODOS' ? styles.tagAtivo : ''}`} onClick={() => setTagFilt('TODOS')}>Todos</button>
          {TAGS_DIETETICAS().map((t) => (
            <button key={t} className={`${styles.tagBtn} ${tagFilt === t ? styles.tagAtivo : ''}`} onClick={() => setTagFilt(t)}>{t}</button>
          ))}
        </div>
      </div>

      {filtradas.length === 0 ? (
        <EmptyState title="Nenhuma receita encontrada" message="Tente outros filtros ou termos de busca." />
      ) : (
        <div className={styles.grid}>
          {filtradas.map((r) => <ReceitaCard key={r.id} receita={r} onClick={setSelecionada} />)}
        </div>
      )}

      <ReceitaModal receita={selecionada} onClose={() => setSelecionada(null)} />
    </div>
  );
}
