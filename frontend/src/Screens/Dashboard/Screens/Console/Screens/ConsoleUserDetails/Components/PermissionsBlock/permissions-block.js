// Modules
import { Field } from 'react-final-form';

// Components
import Permission from './permission';
import PermissionsGroup from './permissions-group';

// Constants
import { PERMISSION, PERMISSION_GROUPS } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

// Styles
import styles from '../../styles.module.scss';

function PermissionsBlock(props) {
  const { areSelfDetails } = props;
  const [user] = useUserContext();

  let adminTitle;

  if (areSelfDetails && user?.isAdmin) {
    adminTitle = 'Адміністратор не може лишити себе прав';
  } else if (!user?.isAdmin) {
    adminTitle = 'Тільки адміністратори можуть редагувати цей пункт';
  }

  const permissionTitle = !user?.hasPermissions(PERMISSION.UPDATE_USERS)
    ? 'Ви не можете редагувати права користувачів'
    : '';

  return (
    <>
      <h2 className={styles.title}>Права доступу користувача</h2>
      <Field
        className={styles.admin}
        component={Permission}
        description="Дозволяє робити будь-що, тобто перевизначає усі інші можливі права по відношенню до консолі адміністратора."
        disabled={areSelfDetails || !user?.isAdmin}
        labelText="Адміністратор"
        name={`permissions[ADMIN]`}
        title={adminTitle}
        type="checkbox"
      />

      {PERMISSION_GROUPS.map(({ description, name, fields }) => {
        return (
          <div className={styles.group} key={name}>
            <PermissionsGroup
              description={description}
              disabled={!user?.hasPermissions(PERMISSION.UPDATE_USERS)}
              fields={fields}
              labelText={name}
              title={permissionTitle}
              type="checkbox"
            />

            {fields?.map(({ name, labelText }) => (
              <Field
                component={Permission}
                disabled={!user?.hasPermissions(PERMISSION.UPDATE_USERS)}
                key={name}
                labelText={labelText}
                name={`permissions[${name}]`}
                title={permissionTitle}
                type="checkbox"
              />
            ))}
          </div>
        );
      })}
    </>
  );
}

export default PermissionsBlock;
