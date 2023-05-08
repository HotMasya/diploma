// Modules
import { useCallback, useMemo, useState } from 'react';

// Components
import DataGrid from 'Components/DataGrid';
import Header from './Components/Header';
import ManageColumnDialog from './Components/ManageColumnDialog';
import CellNoteDialog from './Components/CellNoteDialog';
import RemoveJournalDialog from './Components/RemoveJournalDialog';
import UpdateJournalDialog from './Components/UpdateJournalDialog';

// Context
import { useJournalContext } from 'Context/JournalContext';

// Helpers
import { createGridColumns } from 'Components/DataGrid/Helpers/createGridColumns';

// Styles
import styles from './styles.module.scss';

/**
 * @param {{ journal: import('Models/Journal').default }} props
 */
function JournalDetails(props) {
  const {
    journal,
    onAddColumn,
    onCellUpdate,
    onCellNoteUpdate,
    onSaveColumn,
    onJournalUpdate,
  } = props;

  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const openRemoveModal = useCallback(() => setRemoveModalOpen(true), []);
  const closeRemoveModal = useCallback(() => setRemoveModalOpen(false), []);

  const openUpdateModal = useCallback(() => setUpdateModalOpen(true), []);
  const closeUpdateModal = useCallback(() => setUpdateModalOpen(false), []);

  const [, setJournalContext] = useJournalContext();

  const columns = useMemo(() => createGridColumns(journal.columns), [journal]);

  const handleAddColumn = useCallback(() => {
    setManageModalOpen(true);
  }, []);

  const handleEditColumn = useCallback(
    (id) => {
      const column = journal.columns.find((column) => column.id === id);

      setJournalContext({ column });
      setManageModalOpen(true);
    },
    [journal, setJournalContext]
  );

  const handleCellNoteUpdate = useCallback(
    (index, id) => {
      const cell = journal.rows[index][id];

      setJournalContext({ cell, index, id });
      setNoteModalOpen(true);
    },
    [journal, setJournalContext]
  );

  const closeManageModal = useCallback(() => {
    setJournalContext({});
    setManageModalOpen(false);
  }, [setJournalContext]);

  const closeNoteModal = useCallback(() => setNoteModalOpen(false), []);

  return (
    <>
      <Header
        journal={journal}
        onRemove={openRemoveModal}
        onUpdate={openUpdateModal}
      />
      <div className={styles.wrapper}>
        <DataGrid
          className={styles.grid}
          columns={columns}
          data={journal.rows}
          onAddColumn={handleAddColumn}
          onEditColumn={handleEditColumn}
          onCellUpdate={onCellUpdate}
          onCellNoteUpdate={handleCellNoteUpdate}
        />
      </div>

      {manageModalOpen && (
        <ManageColumnDialog
          onClose={closeManageModal}
          onCreate={onAddColumn}
          onSave={onSaveColumn}
        />
      )}

      {noteModalOpen && (
        <CellNoteDialog
          onClose={closeNoteModal}
          onCellNoteUpdate={onCellNoteUpdate}
        />
      )}

      {removeModalOpen && (
        <RemoveJournalDialog onClose={closeRemoveModal} journal={journal} />
      )}

      {updateModalOpen && (
        <UpdateJournalDialog
          onClose={closeUpdateModal}
          onEdit={onJournalUpdate}
          journal={journal}
        />
      )}
    </>
  );
}

export default JournalDetails;
