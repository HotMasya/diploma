// Modules
import { TbBookOff } from 'react-icons/tb';

// Constants
import { RED } from 'Constants/colors';

// Styles
import styles from './styles.module.scss';

function Placeholder() {
  return (
    <div className={styles.container}>
      <TbBookOff color={RED._400} size={128} />
      <h1>Вас ще немає в жодному журналі</h1>
      <p>Якщо ви вважаєте, що це помилка, повідомте про це адміністрації.</p>
    </div>
  );
}

export default Placeholder;
