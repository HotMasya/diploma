// Modules
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';
import get from 'lodash/get';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';

// API
import API from 'API';

// Components
import Button, { BUTTON_VARIANT } from 'Components/Button';
import FormInput from 'Components/FormInput';
import Dialog from 'Components/Dialog';

// Constants
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

// Helpers
import { isRequired } from 'Helpers/isRequired';

// Styles
import styles from './styles.module.scss';

function FacultyDetailsDialog(props) {
  const { onClose, onUpdate } = props;

  const [outletContext] = useOutletContext();
  const [user] = useUserContext();

  const [pending, setPending] = useState(false);
  const modalRef = useRef(null);

  const faculty = get(outletContext, 'faculty');

  const isNewGroup = !faculty;

  const initialValues = useMemo(
    () => ({
      name: get(faculty, 'name', ''),
      shortName: get(faculty, 'shortName', ''),
    }),
    [faculty]
  );

  const title = isNewGroup ? 'Додати факультет' : 'Редагувати факультет';
  const buttonText = isNewGroup ? 'Додати' : 'Зберегти';

  const handleSubmit = useCallback(
    (values) => {
      setPending(true);
      let request;
      if (isNewGroup) {
        request = API.Faculties.create(values).then(onUpdate);
      } else {
        request = API.Faculties.update(get(faculty, 'id'), values);
      }

      request
        .then(() => {
          onUpdate();
          modalRef.current?.close();
        })
        .finally(() => setPending(false));

      toast.promise(request, {
        success: isNewGroup
          ? 'Новий факультет було успішно додано'
          : 'Дані про факультет були оновлені',
        error: {
          render({ data }) {
            return (
              <>
                <b>Сталася помилка!</b> {API.parseError(data).message}.
              </>
            );
          },
        },
      });
    },
    [faculty, isNewGroup, onUpdate]
  );

  return (
    <Dialog onClose={onClose} pending={pending} ref={modalRef} title={title}>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field
              component={FormInput}
              disabled={!user.hasPermissions(PERMISSION.UPDATE_FACULTIES)}
              labelText="Назва"
              name="name"
              placeholder="Вкажіть назву"
              validate={isRequired()}
            />

            <Field
              component={FormInput}
              disabled={!user.hasPermissions(PERMISSION.UPDATE_FACULTIES)}
              labelText="Скорочена назва (абревіатура)"
              name="shortName"
              placeholder="Вкажіть скорочену назву"
              validate={isRequired()}
            />

            <div className={styles.buttons}>
              <Button
                disabled={!user.hasPermissions(PERMISSION.UPDATE_FACULTIES)}
                type="submit"
              >
                {buttonText}
              </Button>
              <Button
                onClick={() => modalRef.current?.close()}
                variant={BUTTON_VARIANT.secondary}
              >
                Скасувати
              </Button>
            </div>
          </form>
        )}
      />
    </Dialog>
  );
}

export default FacultyDetailsDialog;
