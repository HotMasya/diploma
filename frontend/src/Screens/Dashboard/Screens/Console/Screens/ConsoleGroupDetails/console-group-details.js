// Styles
import styles from './styles.module.scss';

function ConsoleGroupDetails(props) {
  const { handleSumbit } = props;

  return (
    <form onSubmit={handleSumbit}>
      <h1>Group details</h1>
    </form>
  );
}

export default ConsoleGroupDetails;

