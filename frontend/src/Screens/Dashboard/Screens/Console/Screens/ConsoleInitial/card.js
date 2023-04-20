// Modules
import { Link } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';

function Card(props) {
  const { count, description, icon, name, to } = props;

  return (
    <Link className={styles.card} to={to}>
      <div className={styles.wrapper}>
        {icon}
        <div className={styles.details}>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <h2>{count}</h2>
    </Link>
  );
}

export default Card;
