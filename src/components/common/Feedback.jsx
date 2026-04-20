import styles from './Feedback.module.css';

export function LoadingSpinner({ message = 'Carregando...' }) {
  return (
    <div className={styles.spinner}>
      <div className={styles.circle} />
      <span>{message}</span>
    </div>
  );
}

export function EmptyState({ icon = '🥗', title, message }) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>{icon}</div>
      {title   && <p className={styles.emptyTitle}>{title}</p>}
      {message && <p className={styles.emptyMsg}>{message}</p>}
    </div>
  );
}

export function ErrorMessage({ message }) {
  return <div className={styles.errorMsg}>⚠️ {message}</div>;
}
