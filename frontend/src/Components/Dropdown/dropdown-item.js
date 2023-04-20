// Modules
import { memo } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function DropdownItem(props) {
  const { className, onSelect, ...option } = props;

  return (
    <li className={cx(className, styles.item)} onClick={() => onSelect(option)}>
      {option.label}
    </li>
  );
}

DropdownItem.propTypes = {
  className: PropTypes.string,
  onSelect: PropTypes.func,
};

DropdownItem.defaultProps = {
  className: '',
  onSelect: undefined,
};

export default memo(DropdownItem);
