import styles from './FormField.module.css';

export function Input({ label, id, error, ...props }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.label} htmlFor={id}>{label}</label>}
      <input id={id} className={`${styles.input} ${error ? styles.inputError : ''}`} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export function Select({ label, id, error, children, ...props }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.label} htmlFor={id}>{label}</label>}
      <select id={id} className={`${styles.input} ${error ? styles.inputError : ''}`} {...props}>
        {children}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export function Textarea({ label, id, error, ...props }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.label} htmlFor={id}>{label}</label>}
      <textarea id={id} className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
