// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function ErrorMessage(props) {
  const { className, meta } = props;

  return <span className={cx(className, styles.error)}>{meta.error}</span>;
}

ErrorMessage.propTypes = {
  className: PropTypes.string,
  meta: PropTypes.object.isRequired,
};

ErrorMessage.defaultProps = {
  className: '',
};

export default ErrorMessage;
