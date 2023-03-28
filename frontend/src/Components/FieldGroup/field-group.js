// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function FieldGroup(props) {
  const { children, className } = props;

  return <div className={cx(className, styles.group)}>{children}</div>;
}

FieldGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

FieldGroup.defaultProps = {
  children: [],
  className: '',
};

export default FieldGroup;
