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

function DeleteGroupDialog(props) {
  const { onClose, onDelete } = props;

  const [outletContext] = useOutletContext();
  const [pending, setPending] = useState(false);
  const modalRef = useRef();

  const group = get(outletContext, 'group');
  const groupId = get(group, 'id');

  const handleDelete = useCallback(() => {
    if (pending) return;

    setPending(true);

    const request = API.Groups.removeCurator(groupId)
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
        success: 'Куратор був успішно видалений для даної групи',
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
        toastId: 'delete-group-curator',
      }
    );
  }, [onDelete, pending, groupId]);

  if (!group) return null;

  const description = (
    <>
      Для групи <b>{group.name}</b> буде видалено куратора. Безпосередньо сам
      куратор не буде видалений і його можна буде встановити знову.
    </>
  );

  return (
    <Dialog
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Видалити куратора групи"
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

export default memo(DeleteGroupDialog);
