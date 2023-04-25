// Modules
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import map from 'lodash/map';

// API
import API from 'API';

// Components
import ConsoleUserDetails from './console-user-details';

// Constants
import { PERMISSION } from 'Constants/permission';

// Helpers
import { isPassword } from 'Helpers/isPassword';

// Mod
import User from 'Models/User';

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
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
      student: null,

      // Teacher
      teacher: null,
    };

    if (user.student) {
      values.student = {
        id: user.student.id,
        group: user.student.group
          ? {
              label: user.student.group.name,
              value: user.student.group.id,
            }
          : null,
        faculty: user.student.faculty
          ? {
              label: user.student.faculty.name,
              shortName: user.student.faculty.shortName,
              value: user.student.faculty.id,
            }
          : null,
      };
    }

    if (user.teacher) {
      values.teacher = {
        id: user.teacher.id,
        departments: map(
          user.teacher.departments,
          ({ name, shortName, id }) => ({
            label: name,
            shortName,
            value: id,
          })
        ),
      };
    }

    Object.keys(PERMISSION).forEach((k) => {
      values.permissions[k] = user.hasPermissions(PERMISSION[k]);
    });

    return values;
  }, [user]);

  const handleStudentCreate = useCallback(() => {
    API.Students.create({ userId }).then((student) => {
      setUser((prev) => {
        prev.student = student;

        return new User(prev);
      });
    });
  }, [userId]);

  const handleTeacherCreate = useCallback(() => {
    API.Teachers.create({ userId }).then((teacher) => {
      setUser((prev) => {
        prev.teacher = teacher;

        return new User(prev);
      });
    });
  }, [userId]);

  const handleStudentRemove = useCallback(() => {
    API.Students.remove(initialValues.student.id).then(() => {
      setUser((prev) => {
        prev.student = null;

        return new User(prev);
      });
      navigate(pathname);
    });
  }, [initialValues.student?.id, navigate, pathname]);

  const handleTeacherRemove = useCallback(() => {
    API.Teachers.remove(initialValues.teacher.id).then(() => {
      setUser((prev) => {
        prev.teacher = null;

        return new User(prev);
      });
      navigate(pathname);
    });
  }, [initialValues.teacher?.id, navigate, pathname]);

  const handleSubmit = useCallback(
    async (values) => {
      const permissions = Object.entries(values.permissions).reduce(
        (acc, [permission, granted]) => {
          if (granted) {
            acc |= PERMISSION[permission] || 0;
          }

          return acc;
        },
        0
      );

      const student = values.student;
      const teacher = values.teacher;

      if (initialValues.student !== student) {
        await API.Students.update(student.id, {
          groupId: values.student?.group?.value || null,
          facultyId: values.student?.faculty?.value || null,
        });
      }

      if (initialValues.teacher !== teacher) {
        await API.Teachers.update(teacher.id, {
          departmentIds: values.teacher?.departments.map(({ value }) => value),
        });
      }

      let passwordChanged = true;

      if (!values.password) {
        passwordChanged = false;
        delete values.password;
      }

      const data = {
        ...values,
        permissions,
      };

      delete data.repeatPassword;
      delete data.student;
      delete data.teacher;

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
    [initialValues.student, initialValues.teacher, userId]
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
      onStudentCreate={handleStudentCreate}
      onStudentRemove={handleStudentRemove}
      onSubmit={handleSubmit}
      onTeacherCreate={handleTeacherCreate}
      onTeacherRemove={handleTeacherRemove}
      user={user}
      validate={validateForm}
    />
  );
}

export default ConsoleUserDetailsContainer;
