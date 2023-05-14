// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function RadioButton(props) {
  const {
    checked,
    className,
    disabled,
    labelText,
    name,
    onBlur,
    onChange,
    onFocus,
    value,
  } = props;


  return (
    <label
      className={cx(className, styles.radio, {
        [styles.disabled]: disabled,
      })}
    >
      <input
        checked={checked}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        type="radio"
        value={value}
      />
      <span>{labelText}</span>
    </label>
  );
}

RadioButton.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  labelText: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
};

RadioButton.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  labelText: '',
  name: '',
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
};

export default RadioButton;
