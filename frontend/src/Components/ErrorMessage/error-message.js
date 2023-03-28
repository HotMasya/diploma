// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Helpers
import getErrorFromMeta from 'Helpers/getErrorFromMeta';

// Styles
import styles from './styles.module.scss';

function ErrorMessage(props) {
  const { className, meta } = props;

  const { error, showError } = getErrorFromMeta(meta);

  if (!showError) return null;

  return <span className={cx(className, styles.error)}>{error}</span>;
}

ErrorMessage.propTypes = {
  className: PropTypes.string,
  meta: PropTypes.object.isRequired,
};

ErrorMessage.defaultProps = {
  className: '',
};

export default ErrorMessage;
