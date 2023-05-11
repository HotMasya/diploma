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

function DeleteUserDialog(props) {
  const { onClose, onDelete } = props;

  const [outletContext] = useOutletContext();
  const [pending, setPending] = useState(false);
  const modalRef = useRef();

  const user = get(outletContext, 'user');
  const userId = get(user, 'id');

  const handleDelete = useCallback(() => {
    if (pending) return;

    setPending(true);

    const request = API.Users.remove(userId)
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
        success: 'Користувач був успішно видалений',
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
        toastId: 'delete-user',
      }
    );
  }, [onDelete, pending, userId]);

  if (!user) return null;

  const description = (
    <>
      Користувач <b>{user.fullName}</b> буде видалений назавжди. Ця дія&nbsp;
      <b>не є зворотньою</b>.
    </>
  );

  return (
    <Dialog
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Видалити користувача"
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

export default memo(DeleteUserDialog);
