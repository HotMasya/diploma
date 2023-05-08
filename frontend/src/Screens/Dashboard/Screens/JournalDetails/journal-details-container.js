// Modules
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

// API
import API from 'API';

// Components
import JournalDetails from './journal-details';

// Context
import JournalContextProvider from 'Context/JournalContext';

// Hooks
import { useLoadCurrentUser } from 'Hooks/useLoadCurrentUser';

// Models
import Journal from 'Models/Journal';

function JournalDetailsContainer() {
  const [journal, setJournal] = useState();
  const { journalId } = useParams();

  const [user, pendingUser] = useLoadCurrentUser();

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

  const handleCellUpdate = useCallback(
    (index, id, value) => {
      setJournal((prev) => {
        const journal = new Journal(prev);

        if (!journal.rows[index][id]) {
          journal.rows[index][id] = {};
        }

        const cell = Object.assign(journal.rows[index][id], {
          value,
          editor: user.fullName,
          updatedAt: new Date(),
        });

        API.Journals.updateCell(journal.id, { index, id, cell });

        return journal;
      });
    },
    [user]
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

        API.Journals.updateCell(journal.id, { index, id, cell });

        return journal;
      });
    },
    [user]
  );

  const handleJournalUpdate = useCallback((values) => {
    setJournal((prev) => new Journal({ ...prev, ...values }));
  }, []);

  useEffect(() => {
    API.Journals.findOne(journalId).then(setJournal);
  }, [journalId]);

  if (!journal || pendingUser) return null;

  return (
    <JournalContextProvider>
      <JournalDetails
        journal={journal}
        onAddColumn={handleAddColumn}
        onCellNoteUpdate={handleCellNoteUpdate}
        onCellUpdate={handleCellUpdate}
        onJournalUpdate={handleJournalUpdate}
        onSaveColumn={handleSaveColumn}
      />
    </JournalContextProvider>
  );
}

export default JournalDetailsContainer;
