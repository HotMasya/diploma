// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';
import { BsCheck } from 'react-icons/bs';

// Styles
import styles from './styles.module.scss';

function Checkbox(props) {
  const {
    checked,
    className,
    disabled,
    labelText,
    name,
    onBlur,
    onChange,
    onFocus,
  } = props;

  return (
    <label className={cx(className, styles.checkbox)}>
      <input
        checked={checked}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        name={name}
        type="checkbox"
      />
      <BsCheck size={20} />
      <span>{labelText}</span>
    </label>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  labelText: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  labelText: '',
  name: '',
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
};

export default Checkbox;
