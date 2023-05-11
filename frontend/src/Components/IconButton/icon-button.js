// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function IconButton(props) {
  const { children, className, ...rest } = props;

  return (
    <button className={cx(className, styles.button)} {...rest}>
      {children}
    </button>
  );
}

IconButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
};

IconButton.defaultProps = {
  children: [],
  className: '',
  disabled: false,
  onClick: undefined,
  type: 'button',
};

export default IconButton;
