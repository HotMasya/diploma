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

function RemoveFacultyDialog(props) {
  const { onClose, onDelete } = props;

  const [outletContext] = useOutletContext();
  const [pending, setPending] = useState(false);
  const modalRef = useRef();

  const faculty = get(outletContext, 'faculty');
  const facultyId = get(faculty, 'id');

  const handleDelete = useCallback(() => {
    if (pending) return;

    setPending(true);

    const request = API.Faculties.remove(facultyId)
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
        success: 'Факультет був успішно видалений',
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
        toastId: 'delete-faculty',
      }
    );
  }, [onDelete, pending, facultyId]);

  if (!faculty) return null;

  const description = (
    <>
      Факультет <b title={faculty.name}>{faculty.shortName}</b> буде
      видалено назавжди. У всіх студентів цього факультету він також буде
      видалений. Ця дія <b>не є зворотньою</b>.
    </>
  );

  return (
    <Dialog
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Видалити факультет"
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

export default memo(RemoveFacultyDialog);
