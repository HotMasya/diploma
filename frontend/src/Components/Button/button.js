// Modules
import PropTypes from 'prop-types';
import cx from 'classnames';

// Styles
import styles from './styles.module.scss';

function Button(props) {
  const { children, className, ...rest } = props;

  return (
    <button className={cx(className, styles.button)} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  children: [],
  className: '',
  onClick: undefined,
  type: 'button',
};

export default Button;
