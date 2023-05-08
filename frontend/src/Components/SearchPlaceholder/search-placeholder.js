// Modules
import { MdSearchOff } from 'react-icons/md';

// Constants
import { RED } from 'Constants/colors';

// Styles
import styles from './styles.module.scss';

function SearchPlaceholder() {
  return (
    <div className={styles.container}>
      <MdSearchOff color={RED._400} size={128} />
      <h1>По вашому запиту нічого не знайдено</h1>
      <p>
        Спробуйте змінити ваш запит для отримання результатів
      </p>
    </div>
  );
}

export default SearchPlaceholder;
