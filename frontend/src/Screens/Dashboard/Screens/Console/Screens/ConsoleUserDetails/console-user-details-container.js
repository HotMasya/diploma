// Modules
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';

// API
import API from 'API';

// Components
import ConsoleUserDetails from './console-user-details';

// Constants
import { PERMISSION } from 'Constants/permission';
import { isPassword } from 'Helpers/isPassword';

const validateForm = (values) => {
  if (!values.password && !values.repeatPassword) return {};

  const passwordValidationMessage = isPassword()(values.password);

  if (passwordValidationMessage) {
    return {
      password: passwordValidationMessage,
    };
  }

  if (values.password !== values.repeatPassword) {
    return {
      repeatPassword: 'Паролі мають співпадати.',
    };
  }

  return {};
};

function ConsoleUserDetailsContainer() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  const initialValues = useMemo(() => {
    if (!user) return {};

    const values = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      permissions: {},
      password: '',
      repeatPassword: '',
      verified: user.verified,

      // Student
      group: null,
      faculty: null,

      // Teacher
      departments: [],
    };

    Object.keys(PERMISSION).forEach((k) => {
      values.permissions[k] = user.hasPermissions(PERMISSION[k]);
    });

    return values;
  }, [user]);

  const handleSubmit = useCallback(
    (values) => {
      const permissions = Object.entries(values.permissions).reduce(
        (acc, [permission, granted]) => {
          if (granted) {
            acc |= PERMISSION[permission] || 0;
          }

          return acc;
        },
        0
      );

      let passwordChanged = true;

      delete values.repeatPassword;

      if (!values.password) {
        passwordChanged = false;
        delete values.password;
      }

      const data = {
        ...values,
        permissions,
      };

      const request = API.Users.update(userId, data)
        .then(setUser)
        .then(() => {
          if (passwordChanged) {
            toast.success('Пароль користувача було успішно змінено', {
              autoClose: 2000,
            });
          }
        });

      toast.promise(
        request,
        {
          pending: 'Оновлюємо інформацію про користувача...',
          success: 'Інформація про користувача була успішно збережена!',
          error: 'Нажаль, сталася помилка',
        },
        {
          autoClose: 2000,
        }
      );
    },
    [userId]
  );

  useEffect(() => {
    API.Users.findOne(userId)
      .then(setUser)
      .catch((err) => {
        toast(API.parseError(err), {
          type: 'error',
        });
      });
  }, [userId]);

  if (!user) return null;

  return (
    <Form
      component={ConsoleUserDetails}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      user={user}
      validate={validateForm}
    />
  );
}

export default ConsoleUserDetailsContainer;
