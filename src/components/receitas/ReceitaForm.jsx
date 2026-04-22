import { useState, useEffect } from 'react';
import { Input, Select, Textarea } from '../common/FormField';
import CheckboxGroup from '../common/CheckboxGroup';
import Button from '../common/Button';
import styles from './ReceitaForm.module.css';
import { SEGMENTOS, TAGS_DIETETICAS } from '../../utils/helpers';

const EMPTY = {
  nome: '', segmento: 'CAFE_MANHA', descricao: '', urlImagem: '',
  status: 'PUBLICADA', calorias: '', porcaoGramas: '', rendimentoPorcoes: '',
  proteinas: '', carboidratos: '', gorduras: '',
  tempoPreparo: '', dificuldade: 'FACIL',
  ingredientesTexto: '', modoPreparo: '',
  tagsDieteticas: [],
};

export default function ReceitaForm({ inicial, onSubmit, onCancel, loading }) {
  const [form, setForm]   = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (inicial) {
      setForm({
        ...EMPTY,
        ...inicial,
        ingredientesTexto: inicial.ingredientes?.join('\n') || '',
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [inicial]);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.nome.trim())       e.nome = 'Nome é obrigatório';
    if (!form.calorias)          e.calorias = 'Informe as calorias';
    if (!form.tempoPreparo)      e.tempoPreparo = 'Informe o tempo de preparo';
    if (!form.ingredientesTexto) e.ingredientesTexto = 'Informe ao menos 1 ingrediente';
    if (!form.modoPreparo)       e.modoPreparo = 'Informe o modo de preparo';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const { ingredientesTexto, ...rest } = form;
    onSubmit({
      ...rest,
      calorias:          Number(form.calorias),
      porcaoGramas:      Number(form.porcaoGramas),
      rendimentoPorcoes: Number(form.rendimentoPorcoes),
      proteinas:         Number(form.proteinas),
      carboidratos:      Number(form.carboidratos),
      gorduras:          Number(form.gorduras),
      tempoPreparo:      Number(form.tempoPreparo),
      ingredientes: ingredientesTexto.split('\n').map((l) => l.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>

      {/* Identificação */}
      <div className={styles.sectionTitle}>Identificação</div>
      <div className={styles.row2}>
        <Input label="Nome *" id="nome" value={form.nome} onChange={set('nome')} error={errors.nome} placeholder="Ex: Salada de quinoa" />
        <Select label="Segmento *" id="segmento" value={form.segmento} onChange={set('segmento')}>
          {SEGMENTOS().map((s) => <option key={s.value} value={s.value}>{s.emoji} {s.label}</option>)}
        </Select>
      </div>
      <Textarea label="Descrição" id="descricao" value={form.descricao} onChange={set('descricao')} placeholder="Descreva a receita de forma atraente..." />
      <div className={styles.row2}>
        <Input label="URL da Imagem" id="urlImagem" type="url" value={form.urlImagem} onChange={set('urlImagem')} placeholder="https://..." />
        <Select label="Status" id="status" value={form.status} onChange={set('status')}>
          <option value="PUBLICADA">Publicada</option>
          <option value="RASCUNHO">Rascunho</option>
        </Select>
      </div>

      {/* Informações nutricionais */}
      <div className={styles.sectionTitle}>Informações Nutricionais</div>
      <div className={styles.row3}>
        <Input label="Calorias (kcal) *" id="calorias" type="number" value={form.calorias} onChange={set('calorias')} error={errors.calorias} placeholder="Ex: 280" />
        <Input label="Porção (g)" id="porcaoGramas" type="number" value={form.porcaoGramas} onChange={set('porcaoGramas')} placeholder="Ex: 200" />
        <Input label="Rendimento (porções)" id="rendimentoPorcoes" type="number" value={form.rendimentoPorcoes} onChange={set('rendimentoPorcoes')} placeholder="Ex: 2" />
      </div>
      <div className={styles.row3}>
        <Input label="Proteínas (g)" id="proteinas" type="number" value={form.proteinas} onChange={set('proteinas')} placeholder="Ex: 25" />
        <Input label="Carboidratos (g)" id="carboidratos" type="number" value={form.carboidratos} onChange={set('carboidratos')} placeholder="Ex: 30" />
        <Input label="Gorduras (g)" id="gorduras" type="number" value={form.gorduras} onChange={set('gorduras')} placeholder="Ex: 8" />
      </div>

      {/* Preparo */}
      <div className={styles.sectionTitle}>Preparo</div>
      <div className={styles.row2}>
        <Input label="Tempo (min) *" id="tempoPreparo" type="number" value={form.tempoPreparo} onChange={set('tempoPreparo')} error={errors.tempoPreparo} placeholder="Ex: 20" />
        <Select label="Dificuldade" id="dificuldade" value={form.dificuldade} onChange={set('dificuldade')}>
          <option value="FACIL">Fácil</option>
          <option value="MEDIO">Médio</option>
          <option value="DIFICIL">Difícil</option>
        </Select>
      </div>
      <Textarea label="Ingredientes * (um por linha)" id="ingredientesTexto" value={form.ingredientesTexto} onChange={set('ingredientesTexto')} error={errors.ingredientesTexto} placeholder={'200g de frango grelhado\n1 xícara de quinoa cozida'} style={{ minHeight: '90px' }} />
      <Textarea label="Modo de Preparo *" id="modoPreparo" value={form.modoPreparo} onChange={set('modoPreparo')} error={errors.modoPreparo} placeholder="Descreva o passo a passo..." style={{ minHeight: '100px' }} />

      {/* Tags */}
      <div className={styles.sectionTitle}>Tags Dietéticas</div>
      <CheckboxGroup
        options={TAGS_DIETETICAS()}
        value={form.tagsDieteticas}
        onChange={(tags) => setForm((prev) => ({ ...prev, tagsDieteticas: tags }))}
      />

      <div className={styles.actions}>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Receita'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
