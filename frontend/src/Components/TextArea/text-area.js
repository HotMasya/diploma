// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

function TextArea(props) {
  const { className, hasError, ...rest } = props;

  return (
    <textarea
      className={cx(className, styles.textarea, { [styles.error]: hasError })}
      {...rest}
    ></textarea>
  );
}

TextArea.propTypes = {
  className: PropTypes.string,
  hasError: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
};

TextArea.defaultProps = {
  className: '',
  hasError: false,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  value: '',
};

export default TextArea;
