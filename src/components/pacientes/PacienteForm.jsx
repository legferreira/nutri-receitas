import { useState, useEffect } from 'react';
import { Input, Select, Textarea } from '../common/FormField';
import CheckboxGroup from '../common/CheckboxGroup';
import Button from '../common/Button';
import styles from './PacienteForm.module.css';
import { calcularIMC, OBJETIVOS_PACIENTE, RESTRICOES_ALIMENTARES } from '../../utils/helpers';

const EMPTY = {
  nome: '', dataNascimento: '', email: '', telefone: '',
  pesoAtual: '', altura: '', pesoMeta: '',
  dataConsulta: '', objetivo: 'Emagrecimento',
  status: 'ATIVA', restricoesAlimentares: [], observacoes: '',
};

export default function PacienteForm({ inicial, onSubmit, onCancel, loading }) {
  const [form, setForm]     = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(inicial ? { ...EMPTY, ...inicial } : EMPTY);
    setErrors({});
  }, [inicial]);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const imc = calcularIMC(form.pesoAtual, form.altura);

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome     = 'Nome é obrigatório';
    if (!form.pesoAtual)   e.pesoAtual = 'Informe o peso atual';
    if (!form.altura)      e.altura    = 'Informe a altura';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      pesoAtual: Number(form.pesoAtual),
      altura:    Number(form.altura),
      pesoMeta:  Number(form.pesoMeta) || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.sectionTitle}>Dados Pessoais</div>
      <div className={styles.row2}>
        <Input label="Nome Completo *" id="nome" value={form.nome} onChange={set('nome')} error={errors.nome} placeholder="Nome da paciente" />
        <Input label="Data de Nascimento" id="dataNascimento" type="date" value={form.dataNascimento} onChange={set('dataNascimento')} />
      </div>
      <div className={styles.row2}>
        <Input label="E-mail" id="email" type="email" value={form.email} onChange={set('email')} placeholder="email@exemplo.com" />
        <Input label="WhatsApp" id="telefone" value={form.telefone} onChange={set('telefone')} placeholder="(11) 99999-9999" />
      </div>

      <div className={styles.sectionTitle}>Dados Clínicos</div>
      <div className={styles.row3}>
        <Input label="Peso Atual (kg) *" id="pesoAtual" type="number" step="0.1" value={form.pesoAtual} onChange={set('pesoAtual')} error={errors.pesoAtual} placeholder="Ex: 72.5" />
        <Input label="Altura (cm) *" id="altura" type="number" value={form.altura} onChange={set('altura')} error={errors.altura} placeholder="Ex: 165" />
        <div className={styles.imcBox}>
          <span className={styles.imcLabel}>IMC Calculado</span>
          <span className={styles.imcValue}>{imc || '—'}</span>
        </div>
      </div>
      <div className={styles.row2}>
        <Input label="Peso Meta (kg)" id="pesoMeta" type="number" step="0.1" value={form.pesoMeta} onChange={set('pesoMeta')} placeholder="Ex: 65" />
        <Input label="Data da 1ª Consulta" id="dataConsulta" type="date" value={form.dataConsulta} onChange={set('dataConsulta')} />
      </div>
      <div className={styles.row2}>
        <Select label="Objetivo Principal" id="objetivo" value={form.objetivo} onChange={set('objetivo')}>
          {OBJETIVOS_PACIENTE().map((o) => <option key={o}>{o}</option>)}
        </Select>
        <Select label="Status" id="status" value={form.status} onChange={set('status')}>
          <option value="ATIVA">Ativa</option>
          <option value="INATIVA">Inativa</option>
        </Select>
      </div>

      <div className={styles.sectionTitle}>Restrições Alimentares</div>
      <CheckboxGroup
        options={RESTRICOES_ALIMENTARES()}
        value={form.restricoesAlimentares}
        onChange={(v) => setForm((prev) => ({ ...prev, restricoesAlimentares: v }))}
      />

      <div className={styles.sectionTitle}>Observações Clínicas</div>
      <Textarea id="observacoes" value={form.observacoes} onChange={set('observacoes')} placeholder="Histórico, alergias, medicamentos em uso..." />

      <div className={styles.actions}>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Paciente'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
  );
}
