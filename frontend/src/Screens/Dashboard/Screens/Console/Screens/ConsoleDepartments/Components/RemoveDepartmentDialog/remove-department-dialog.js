// Modules
import { memo, useCallback, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';

// API
import API from 'API';

// Components
import Dialog from 'Components/Dialog';
import Button, { BUTTON_VARIANT } from 'Components/Button';

function RemoveDepartmentDialog(props) {
  const { onClose, onDelete } = props;

  const [outletContext] = useOutletContext();
  const [pending, setPending] = useState(false);
  const modalRef = useRef();

  const department = get(outletContext, 'department');
  const departmentId = get(department, 'id');

  const handleDelete = useCallback(() => {
    if (pending) return;

    setPending(true);

    const request = API.Departments.remove(departmentId)
      .then(() => {
        modalRef.current.close();
        if (isFunction(onDelete)) {
          onDelete();
        }
      })
      .finally(() => setPending(false));

    toast.promise(
      request,
      {
        success: 'Кафедра була успішно видалена',
        error: {
          render({ data }) {
            return (
              <>
                <b>Сталася помилка!</b> {API.parseError(data).message}.
              </>
            );
          },
        },
      },
      {
        autoClose: 3000,
        toastId: 'delete-department',
      }
    );
  }, [onDelete, pending, departmentId]);

  if (!department) return null;

  const description = (
    <>
      Кафедра <b title={department.name}>{department.shortName}</b> буде
      видалена назавжди. У всіх викладачів цієї кафедри вона також буде
      видалена. Ця дія <b>не є зворотньою</b>.
    </>
  );

  return (
    <Dialog
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Видалити кафедру"
    >
      <Button onClick={handleDelete} variant={BUTTON_VARIANT.destructive}>
        Видалити
      </Button>
      <Button
        onClick={() => modalRef.current?.close()}
        variant={BUTTON_VARIANT.secondary}
      >
        Скасувати
      </Button>
    </Dialog>
  );
}

export default memo(RemoveDepartmentDialog);
