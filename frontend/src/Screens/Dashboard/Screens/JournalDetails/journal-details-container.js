// Modules
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

// API
import API from 'API';

// Components
import JournalDetails from './journal-details';

// Context
import JournalContextProvider from 'Context/JournalContext';

// Hooks
import { useLoadCurrentUser } from 'Hooks/useLoadCurrentUser';
import { usePagination } from 'Hooks/usePagination';

// Models
import Journal from 'Models/Journal';

// Styles
import styles from './styles.module.scss';

const limit = 10;

function JournalDetailsContainer() {
  const [journal, setJournal] = useState();
  const [logs, setLogs] = useState([]);
  const { journalId } = useParams();
  const timeoutRef = useRef({});

  const [user, pendingUser] = useLoadCurrentUser();

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, handlePageChange] = usePagination();

  const handleSaveColumn = useCallback(
    (column) => {
      setJournal((prev) => {
        const journal = new Journal(prev);
        const journalColumn = journal.columns.find(
          ({ id }) => column.id === id
        );

        Object.assign(journalColumn, column);

        API.Journals.update(journalId, journal);

        return journal;
      });
    },
    [journalId]
  );

  const handleAddColumn = useCallback(
    (column) => {
      setJournal((prev) => {
        const journal = new Journal(prev);
        journal.columns.push(column);

        API.Journals.update(journalId, journal);

        return journal;
      });
    },
    [journalId]
  );

  const fetchLogs = useCallback(() => {
    API.Logs.findAll({
      journalId,
      skip: (currentPage - 1) * limit,
      take: limit,
    })
      .then((logs) => {
        setLogs(logs);

        return API.Logs.getTotalCount(journalId);
      })
      .then(setTotalCount);
  }, [currentPage, journalId]);

  const handleCellUpdate = useCallback(
    (index, id, value) => {
      setJournal((prev) => {
        const journal = new Journal(prev);

        if (!journal.rows[index][id]) {
          journal.rows[index][id] = {};
        }

        const cell = Object.assign({}, journal.rows[index][id], {
          value,
          editor: user.fullName,
          updatedAt: new Date(),
        });

        const teacherId = user.teacher.id;

        API.Journals.updateCell(journal.id, {
          index,
          id,
          cell,
          teacherId,
        }).then(fetchLogs);

        journal.rows[index][id] = cell;

        return journal;
      });
    },
    [fetchLogs, user]
  );

  const handleCellNoteUpdate = useCallback(
    (index, id, note) => {
      setJournal((prev) => {
        const journal = new Journal(prev);

        if (!journal.rows[index][id]) {
          journal.rows[index][id] = {};
        }

        const cell = Object.assign(journal.rows[index][id], {
          note,
          editor: user.fullName,
          updatedAt: new Date(),
        });

        const teacherId = user.teacher.id;

        API.Journals.updateCell(journal.id, {
          index,
          id,
          cell,
          teacherId,
        }).then(fetchLogs);

        return journal;
      });
    },
    [fetchLogs, user]
  );

  const handleCellHighlight = useCallback((log) => {
    const id = `grid-cell-${log.index}-${log.columnId}`;
    const cell = document.getElementById(id);

    if (!cell) return;

    clearTimeout(timeoutRef.current[id]);

    cell.classList.remove(styles.highlight);
    cell.classList.add(styles.highlight);

    cell.children[0].focus();

    timeoutRef.current[id] = setTimeout(
      () => cell.classList.remove(styles.highlight),
      3000
    );
  }, []);

  const handleJournalUpdate = useCallback((values) => {
    setJournal((prev) => new Journal({ ...prev, ...values }));
  }, []);

  useEffect(() => {
    API.Journals.findOne(journalId).then((journal) => {
      setJournal(journal);
      return fetchLogs();
    });
  }, [fetchLogs, journalId]);

  if (!journal || pendingUser) return null;

  return (
    <JournalContextProvider>
      <JournalDetails
        currentPage={currentPage}
        isOwner={user.id === journal.teacher.user.id}
        journal={journal}
        limit={limit}
        logs={logs}
        onAddColumn={handleAddColumn}
        onCellHighlight={handleCellHighlight}
        onCellNoteUpdate={handleCellNoteUpdate}
        onCellUpdate={handleCellUpdate}
        onJournalUpdate={handleJournalUpdate}
        onPageChange={handlePageChange}
        onSaveColumn={handleSaveColumn}
        totalCount={totalCount}
      />
    </JournalContextProvider>
  );
}

export default JournalDetailsContainer;
