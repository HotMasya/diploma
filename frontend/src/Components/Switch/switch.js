// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function Switch(props) {
  const {
    checked,
    className,
    disabled,
    name,
    onBlur,
    onChange,
    onFocus,
    value,
  } = props;

  return (
    <input
      checked={checked}
      className={cx(className, styles.switch)}
      disabled={disabled}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      type="checkbox"
      value={value}
    />
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
};

Switch.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  name: '',
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  value: '',
};

export default Switch;
