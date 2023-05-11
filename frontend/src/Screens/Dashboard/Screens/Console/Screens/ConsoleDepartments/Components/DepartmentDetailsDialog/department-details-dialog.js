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

// Helpers
import { isRequired } from 'Helpers/isRequired';

// Styles
import styles from './styles.module.scss';

function DepartmentDetailsDialog(props) {
  const { onClose, onUpdate } = props;

  const [outletContext] = useOutletContext();
  const [pending, setPending] = useState(false);
  const modalRef = useRef(null);

  const department = get(outletContext, 'department');

  const isNewGroup = !department;

  const initialValues = useMemo(
    () => ({
      name: get(department, 'name', ''),
      shortName: get(department, 'shortName', ''),
    }),
    [department]
  );

  const title = isNewGroup ? 'Додати кафедру' : 'Редагувати кафедру';
  const buttonText = isNewGroup ? 'Додати' : 'Зберегти';

  const handleSubmit = useCallback(
    (values) => {
      setPending(true);
      let request;
      if (isNewGroup) {
        request = API.Departments.create(values).then(onUpdate);
      } else {
        request = API.Departments.update(get(department, 'id'), values);
      }

      request
        .then(() => {
          onUpdate();
          modalRef.current?.close();
        })
        .finally(() => setPending(false));

      toast.promise(request, {
        success: isNewGroup
          ? 'Нову кафедру було успішно додано'
          : 'Дані про кафедру були оновлені',
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
    [department, isNewGroup, onUpdate]
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
              labelText="Назва"
              name="name"
              placeholder="Вкажіть назву"
              validate={isRequired()}
            />

            <Field
              component={FormInput}
              labelText="Скорочена назва (абревіатура)"
              name="shortName"
              placeholder="Вкажіть скорочену назву"
              validate={isRequired()}
            />

            <div className={styles.buttons}>
              <Button type="submit">{buttonText}</Button>
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

export default DepartmentDetailsDialog;
