// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';

const getActiveClassName = (isActive, disabled, className) =>
  cx(className, styles.tab, {
    [styles.active]: isActive,
    [styles.disabled]: disabled,
  });

function Tab(props) {
  const { children, className, visible, disabled, ...linkProps } = props;

  if (!visible) return null;

  return (
    <NavLink
      className={({ isActive }) =>
        getActiveClassName(isActive, disabled, className)
      }
      {...linkProps}
    >
      {children}
    </NavLink>
  );
}

Tab.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  to: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};

Tab.defaultProps = {
  children: [],
  className: '',
  disabled: false,
  visible: true,
};

export default Tab;
