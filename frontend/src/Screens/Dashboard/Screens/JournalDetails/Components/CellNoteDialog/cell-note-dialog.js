// Modules
import { useCallback, useRef, useState } from 'react';
import get from 'lodash/get';

// Components
import Dialog from 'Components/Dialog/dialog';
import TextArea from 'Components/TextArea';
import Button, { BUTTON_VARIANT } from 'Components/Button';

// Context
import { useJournalContext } from 'Context/JournalContext';

// Styles
import styles from './styles.module.scss';

function CellNoteDialog(props) {
  const { onClose, onCellNoteUpdate } = props;

  const [journalContext] = useJournalContext();
  const modalRef = useRef();

  const cell = get(journalContext, 'cell');
  const id = get(journalContext, 'id');
  const index = get(journalContext, 'index');

  const [note, setNote] = useState(cell?.note || '');

  const handleChange = useCallback(({ target }) => setNote(target.value), []);

  const handleSave = () => {
    if (cell?.note !== note) {
      onCellNoteUpdate(index, id, note);
    }

    modalRef.current.close();
  };

  return (
    <Dialog title="Редагувати замітку" onClose={onClose} ref={modalRef}>
      <div className={styles.container}>
        <TextArea
          placeholder="Вкажіть замітку для виділенної клітинки"
          value={note}
          onChange={handleChange}
        />

        <div className={styles.buttons}>
          <Button onClick={handleSave}>Зберегти</Button>
          <Button
            onClick={() => modalRef.current.close()}
            variant={BUTTON_VARIANT.secondary}
          >
            Скасувати
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default CellNoteDialog;
