// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function Paper(props) {
  const { children, className } = props;

  return <div className={cx(className, styles.paper)}>{children}</div>
}

Paper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Paper.defaultProps = {
  children: [],
  className: '',
};

export default Paper;
