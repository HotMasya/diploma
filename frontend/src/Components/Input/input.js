// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function Input(props) {
  const { className, hasError, ...rest } = props;

  return (
    <input
      className={cx(className, styles.input, { [styles.error]: hasError })}
      {...rest}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  hasError: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  hasError: false,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  type: 'text',
  value: '',
};

export default Input;
