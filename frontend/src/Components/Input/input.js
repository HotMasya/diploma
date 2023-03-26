// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function Input(props) {
  const { className, ...rest } = props;

  return <input className={cx(className, styles.input)} {...rest} />;
}

Input.propTypes = {
  className: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  type: 'text',
  value: '',
};

export default Input;
