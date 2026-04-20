import Badge from '../common/Badge';
import Button from '../common/Button';
import styles from './ReceitaTabela.module.css';
import { SEGMENTOS } from '../../utils/helpers';

export default function ReceitaTabela({ receitas, onEditar, onExcluir }) {
  const segLabel = (val) =>
    SEGMENTOS().find((s) => s.value === val)?.label || val;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Segmento</th>
            <th>Kcal</th>
            <th>Macros P/C/G</th>
            <th>Tags</th>
            <th>Dif.</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {receitas.map((r) => (
            <tr key={r.id}>
              <td className={styles.nome}>{r.nome}</td>
              <td><Badge variant="verde">{segLabel(r.segmento)}</Badge></td>
              <td>{r.calorias} kcal</td>
              <td className={styles.macros}>{r.proteinas}g / {r.carboidratos}g / {r.gorduras}g</td>
              <td>
                <div className={styles.tagsCell}>
                  {r.tagsDieteticas?.slice(0, 2).map((t) => (
                    <Badge key={t} variant="terracota">{t}</Badge>
                  ))}
                  {r.tagsDieteticas?.length > 2 && (
                    <span className={styles.more}>+{r.tagsDieteticas.length - 2}</span>
                  )}
                </div>
              </td>
              <td>
                <Badge variant={r.dificuldade === 'FACIL' ? 'verde' : 'terracota'}>
                  {r.dificuldade === 'FACIL' ? 'Fácil' : r.dificuldade === 'MEDIO' ? 'Médio' : 'Difícil'}
                </Badge>
              </td>
              <td>
                <Badge variant={r.status === 'PUBLICADA' ? 'verde' : 'yellow'}>
                  {r.status === 'PUBLICADA' ? 'Publicada' : 'Rascunho'}
                </Badge>
              </td>
              <td>
                <div className={styles.acoes}>
                  <Button size="sm" variant="secondary" onClick={() => onEditar(r)}>Editar</Button>
                  <Button size="sm" variant="danger"    onClick={() => onExcluir(r.id)}>Excluir</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
