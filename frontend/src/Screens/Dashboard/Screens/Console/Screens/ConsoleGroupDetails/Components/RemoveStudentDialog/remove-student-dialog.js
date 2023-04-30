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

function RemoveStudentDialog(props) {
  const { onClose, onDelete } = props;

  const [outletContext] = useOutletContext();
  const [pending, setPending] = useState(false);
  const modalRef = useRef();

  const student = get(outletContext, 'student');
  const group = get(outletContext, 'group');
  const studentId = get(student, 'id');
  const groupId = get(group, 'id');

  const handleDelete = useCallback(() => {
    if (pending) return;

    setPending(true);

    const request = API.Groups.removeStudent(groupId, studentId)
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
        success: 'Студент був успішно видалений з групи',
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
        toastId: 'remove-student-from-group',
      }
    );
  }, [groupId, onDelete, pending, studentId]);

  if (!student || !group) return null;

  const description = (
    <>
      Студент <b>{student.user.fullName}</b> буде видалений з групи
      <b>{group.name}</b>. Сам студент не буде видалений. Його знову можна буде
      додати до групи через налаштування користувача чи групи.
    </>
  );

  return (
    <Dialog
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Видалити студента з групи"
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

export default memo(RemoveStudentDialog);
