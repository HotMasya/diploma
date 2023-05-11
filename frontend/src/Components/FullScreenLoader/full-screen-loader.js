// Styles
import styles from './styles.module.scss';

function FullScreenLoader() {
  return <div className={styles.container}>
    <h1>Зачекайте будь-ласка :)</h1>
    <p>Завантажуємо профіль...</p>
    <div className={styles.loader} />
  </div>;
}

export default FullScreenLoader;
