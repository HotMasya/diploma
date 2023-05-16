// Modules
import { TbBookOff } from 'react-icons/tb';

// Styles
import styles from './styles.module.scss';
import { RED } from 'Constants/colors';

function Placeholder(props) {
  const { onCreate } = props;

  return (
    <div className={styles.container}>
      <TbBookOff color={RED._400} size={128} />
      <h1>У вас ще немає жодного журналу</h1>
      {onCreate && (
        <p>
          Але ви можете його&nbsp;
          <button className={styles.link} onClick={onCreate}>
            створити
          </button>
          .
        </p>
      )}
    </div>
  );
}

export default Placeholder;
