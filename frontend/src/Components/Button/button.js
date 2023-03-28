// Modules
import PropTypes from 'prop-types';
import cx from 'classnames';

// Styles
import styles from './styles.module.scss';

export const BUTTON_VARIANT = Object.freeze({
  primary: 'primary',
  secondary: 'secondary',
  destructive: 'destructive',
});

function Button(props) {
  const { children, className, variant, ...rest } = props;

  return (
    <button className={cx(className, styles.button, styles[variant])} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANT)),
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  children: [],
  className: '',
  onClick: undefined,
  variant: BUTTON_VARIANT.primary,
  type: 'button',
};

export default Button;
