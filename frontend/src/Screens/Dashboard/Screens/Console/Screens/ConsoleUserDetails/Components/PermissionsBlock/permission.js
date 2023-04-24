// Modules
import cx from 'classnames';

// Components
import Switch from 'Components/Switch';

// Styles
import styles from '../../styles.module.scss';

function Permission(props) {
  const { disabled, input, labelText, title } = props;

  return (
    <label
      className={cx(styles.permission, { [styles.disabled]: disabled })}
      title={title}
    >
      <span className={cx(styles.label, { [styles.checked]: input.checked })}>
        {labelText}
      </span>
      <Switch disabled={disabled} {...input} />
    </label>
  );
}

export default Permission;
