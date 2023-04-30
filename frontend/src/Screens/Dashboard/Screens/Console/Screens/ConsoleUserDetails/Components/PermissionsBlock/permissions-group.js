// Modules
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-final-form';
import cx from 'classnames';

// Components
import Switch from 'Components/Switch';

// Styles
import styles from '../../styles.module.scss';

function PermissionsGroup(props) {
  const { description, disabled, fields, labelText, title } = props;

  const [checked, setChecked] = useState(false);
  const form = useForm();
  const { values } = form.getState();

  const handleChange = useCallback(
    ({ target }) => {
      form.batch(() => {
        fields.forEach(({ name }) => {
          form.change(`permissions[${name}]`, target.checked);
        });
      });

      setChecked(target.checked);
    },
    [fields, form]
  );

  useEffect(() => {
    const { permissions } = values;

    const checkedGroupsInField = fields.find(({ name }) => permissions[name]);

    if (checkedGroupsInField && !checked) {
      setChecked(true);
    } else if (!checkedGroupsInField && checked) {
      setChecked(false);
    }
  }, [checked, fields, values]);

  return (
    <label
      className={cx(styles.permissionGroup, {
        [styles.disabled]: disabled,
      })}
      title={title}
    >
      <div>
        <h3>{labelText}</h3>
        <p>{description}</p>
      </div>
      <Switch checked={checked} disabled={disabled} onChange={handleChange} />
    </label>
  );
}

export default PermissionsGroup;
