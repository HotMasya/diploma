// Modules
import { memo, useCallback, useRef } from 'react';

// Components
import Dialog from 'Components/Dialog';
import Button, { BUTTON_VARIANT } from 'Components/Button';

function RemoveStudentDialog(props) {
  const { onClose, onRemove, user } = props;

  const modalRef = useRef();

  const description = (
    <>
      Студент <b>{user.fullName}</b> буде видалений <b>назавжди</b>. Усі дані в
      журналах та групах, що пов'язані із ним, також будут <b>видалені</b>. Ця
      дія <b>не є зворотньою</b>.
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
      title="Видалити студента"
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

export default memo(RemoveStudentDialog);
