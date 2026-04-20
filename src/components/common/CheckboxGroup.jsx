import styles from './CheckboxGroup.module.css';

export default function CheckboxGroup({ label, options, value = [], onChange }) {
  const toggle = (opt) => {
    const next = value.includes(opt)
      ? value.filter((v) => v !== opt)
      : [...value, opt];
    onChange(next);
  };

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.group}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`${styles.tag} ${value.includes(opt) ? styles.active : ''}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
