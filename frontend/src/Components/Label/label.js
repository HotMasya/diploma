// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function Label(props) {
  const { children, className, htmlFor } = props;

  return (
    <label className={cx(className, styles.label)} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

Label.defaultProps = {
  children: [],
  className: '',
  htmlFor: '',
};

export default Label;
