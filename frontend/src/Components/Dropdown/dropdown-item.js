// Modules
import { memo } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function DropdownItem(props) {
  const { children, className, onClick } = props;

  return (
    <li className={cx(className, styles.item)} onClick={onClick}>
      {children}
    </li>
  );
}

DropdownItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

DropdownItem.defaultProps = {
  children: [],
  className: '',
  onClick: undefined,
};

export default memo(DropdownItem);
