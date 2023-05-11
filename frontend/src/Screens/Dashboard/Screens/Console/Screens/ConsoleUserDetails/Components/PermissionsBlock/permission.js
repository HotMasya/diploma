// Modules
import cx from 'classnames';

// Components
import Switch from 'Components/Switch';

// Styles
import styles from '../../styles.module.scss';

function Permission(props) {
  const { className, description, disabled, input, labelText, title } = props;

  return (
    <label
      className={cx(className, styles.permission, {
        [styles.disabled]: disabled,
      })}
      title={title}
    >
      <div>
        <span className={cx(styles.label, { [styles.checked]: input.checked })}>
          {labelText}
        </span>
        <p>{description}</p>
      </div>
      <Switch disabled={disabled} {...input} />
    </label>
  );
}

export default Permission;
