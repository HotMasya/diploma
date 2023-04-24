// Modules
import { Field } from 'react-final-form';
import { useParams } from 'react-router-dom';

// Components
import Permission from './permission';

// Context
import { useUserContext } from 'Context/UserContext';

// Constants
import { PERMISSION, PERMISSIONS_MAP } from 'Constants/permission';

// Styles
import styles from '../../styles.module.scss';

function PermissionsBlock() {
  const { userId } = useParams();
  const [user] = useUserContext();

  return (
    <>
      <h2 className={styles.title}>Права доступу користувача</h2>
      {Object.keys(PERMISSION).map((permission) => {
        const editingSelfAdmin =
          PERMISSION[permission] === PERMISSION.ADMIN && +userId === user.id;
        const title = editingSelfAdmin
          ? 'Ви не можете прибрати право адміністратора із самого себе'
          : '';

        return (
          <Field
            component={Permission}
            disabled={editingSelfAdmin}
            key={permission}
            labelText={PERMISSIONS_MAP[permission]}
            name={`permissions[${permission}]`}
            title={title}
            type="checkbox"
          />
        );
      })}
    </>
  );
}

export default PermissionsBlock;
