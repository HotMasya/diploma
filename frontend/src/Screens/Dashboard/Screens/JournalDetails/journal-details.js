// Modules
import { useCallback, useMemo, useState } from 'react';

// Components
import AddHelpersDialog from './Components/AddHelpersDialog';
import DataGrid from 'Components/DataGrid';
import Header from './Components/Header';
import ManageColumnDialog from './Components/ManageColumnDialog';
import CellNoteDialog from './Components/CellNoteDialog';
import RemoveJournalDialog from './Components/RemoveJournalDialog';
import UpdateJournalDialog from './Components/UpdateJournalDialog';
import Table from 'Components/Table';
import Paginator from 'Components/Paginator/paginator';

// Constants
import { columns } from './columns-config';

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
    currentPage,
    isOwner,
    journal,
    limit,
    logs,
    onAddColumn,
    onCellHighlight,
    onCellNoteUpdate,
    onCellUpdate,
    onJournalUpdate,
    onPageChange,
    onSaveColumn,
    rows,
    totalCount,
  } = props;

  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [accessModalOpen, setAccessModalOpen] = useState(false);

  const openAccessModal = useCallback(() => setAccessModalOpen(true), []);
  const closeAccessModal = useCallback(() => setAccessModalOpen(false), []);

  const openRemoveModal = useCallback(() => setRemoveModalOpen(true), []);
  const closeRemoveModal = useCallback(() => setRemoveModalOpen(false), []);

  const openUpdateModal = useCallback(() => setUpdateModalOpen(true), []);
  const closeUpdateModal = useCallback(() => setUpdateModalOpen(false), []);

  const [, setJournalContext] = useJournalContext();

  const gridColumns = useMemo(
    () => createGridColumns(journal.columns, true, isOwner),
    [isOwner, journal]
  );

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

  const logsTableMeta = useMemo(() => ({ onCellHighlight }), [onCellHighlight]);

  return (
    <>
      <Header
        journal={journal}
        onManageAccess={openAccessModal}
        onRemove={openRemoveModal}
        onUpdate={openUpdateModal}
      />
      <div className={styles.wrapper}>
        <DataGrid
          className={styles.grid}
          columns={gridColumns}
          data={rows}
          onAddColumn={handleAddColumn}
          onEditColumn={handleEditColumn}
          onCellUpdate={onCellUpdate}
          onCellNoteUpdate={handleCellNoteUpdate}
        />

        <div className={styles.logs}>
          <h2>Логи</h2>
          <Table
            data={logs}
            columns={columns}
            meta={logsTableMeta}
            preventOverflow={false}
          />
          <Paginator
            className={styles.paginator}
            currentPage={currentPage}
            limit={limit}
            onChange={onPageChange}
            total={totalCount}
          />
        </div>
      </div>

      {manageModalOpen && (
        <ManageColumnDialog
          journal={journal}
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
          journal={journal}
          onClose={closeUpdateModal}
          onEdit={onJournalUpdate}
        />
      )}

      {accessModalOpen && (
        <AddHelpersDialog
          onClose={closeAccessModal}
          journal={journal}
        />
      )}
    </>
  );
}

export default JournalDetails;
