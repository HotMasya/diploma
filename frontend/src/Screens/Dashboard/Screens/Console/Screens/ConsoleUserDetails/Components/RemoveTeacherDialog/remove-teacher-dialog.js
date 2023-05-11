// Modules
import { memo, useCallback, useRef } from 'react';

// Components
import Dialog from 'Components/Dialog';
import Button, { BUTTON_VARIANT } from 'Components/Button';

function RemoveTeacherDialog(props) {
  const { onClose, onRemove, user } = props;

  const modalRef = useRef();

  const description = (
    <>
      Викладач <b>{user.fullName}</b> буде видалений <b>назавжди</b>.{' '}
      <b>Усі журнали</b>, власником яких є цей викладач, а також усі дані в
      групах про кураторство, будуть <b>видалені</b>. Ця дія&nbsp;
      <b>не є зворотньою</b>.
    </>
  );

  const handleRemove = useCallback(() => {
    modalRef.current.close().then(onRemove);
  }, [onRemove]);

  return (
    <Dialog
      description={description}
      onClose={onClose}
      ref={modalRef}
      title="Видалити викладача"
    >
      <Button onClick={handleRemove} variant={BUTTON_VARIANT.destructive}>
        Видалити
      </Button>
      <Button
        onClick={() => modalRef.current.close()}
        variant={BUTTON_VARIANT.secondary}
      >
        Скасувати
      </Button>
    </Dialog>
  );
}

export default memo(RemoveTeacherDialog);
