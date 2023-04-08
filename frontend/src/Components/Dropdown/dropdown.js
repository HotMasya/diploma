// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Components
import DropdownItem from './dropdown-item';

// Styles
import styles from './styles.module.scss';

function Dropdown(props) {
  const { children, className } = props;

  return <ul className={cx(className, styles.container)}>{children}</ul>;
}

Dropdown.Item = DropdownItem;

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  children: [],
  className: '',
};

export default Dropdown;
