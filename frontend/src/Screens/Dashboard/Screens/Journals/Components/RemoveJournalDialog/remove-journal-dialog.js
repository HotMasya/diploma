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
import Input from 'Components/Input';

// Styles
import styles from './styles.module.scss';

function DeleteGroupCuratorDialog(props) {
  const { onClose, onDelete } = props;

  const [name, setName] = useState('');
  const [outletContext] = useOutletContext();
  const [pending, setPending] = useState(false);
  const modalRef = useRef();

  const journal = get(outletContext, 'journal');
  const journalId = get(journal, 'id');

  const handleChange = useCallback(({ target }) => setName(target.value), []);

  const handleDelete = useCallback(() => {
    if (pending) return;

    setPending(true);

    const request = API.Journals.remove(journalId)
      .then(() => {
        if (isFunction(onDelete)) {
          onDelete();
        }
        modalRef.current.close();
      })
      .finally(() => setPending(false));

    toast.promise(
      request,
      {
        success: 'Журнал був успішно видалений.',
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
        toastId: 'delete-journal',
      }
    );
  }, [onDelete, pending, journalId]);

  if (!journal) return null;

  const description = (
    <>
      Журнал <b>{journal.name}</b> буде видалений <b>назавжди</b> і вся
      інформація, записана в нього стане недоступною. Ця дія&nbsp;
      <b>не є зворотньою</b>.
      <br />
      <br />
      Якщо ви впевнені, що хочете видалити журнал, повторіть назву журналу&nbsp;
      <b>"{journal.name}"</b> у полі нижче та натисніть кнопку "Видалити".
    </>
  );

  return (
    <Dialog
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Видалити журнал"
    >
      <div className={styles.container}>
        <Input
          placeholder="Вкажіть назву журналу"
          value={name}
          onChange={handleChange}
        />
        <div className={styles.buttons}>
          <Button
            disabled={name !== journal.name}
            onClick={handleDelete}
            variant={BUTTON_VARIANT.destructive}
          >
            Видалити
          </Button>
          <Button
            onClick={() => modalRef.current?.close()}
            variant={BUTTON_VARIANT.secondary}
          >
            Скасувати
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(DeleteGroupCuratorDialog);
