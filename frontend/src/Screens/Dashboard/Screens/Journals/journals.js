// Modules
import { BiBookAdd } from 'react-icons/bi';

// API
import API from 'API';

// Components
import Button from 'Components/Button';
import CreateJournalDialog from './Components/CreateJournalDialog';
import Input from 'Components/Input';
import Journal from './Components/Journal';
import Paginator from 'Components/Paginator';
import Paper from 'Components/Paper/paper';
import Placeholder from './Components/Placeholder';
import RemoveJournalDialog from './Components/RemoveJournalDialog';
import SearchPlaceholder from 'Components/SearchPlaceholder';

// Hooks
import { useCallback, useEffect, useState } from 'react';
import { usePagination } from 'Hooks/usePagination';
import { useSearch } from 'Hooks/useSearch';

// Styles
import styles from './styles.module.scss';
import { useOutletContext } from 'react-router-dom';

const limit = 4;

function Journals() {
  const [journals, setJournals] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [, setOutletContext] = useOutletContext();

  const closeCreateModal = useCallback(() => {
    setCreateModalOpen(false);
    setOutletContext({});
  }, [setOutletContext]);

  const openCreateModal = useCallback(() => setCreateModalOpen(true), []);

  const closeRemoveModal = useCallback(() => {
    setRemoveModalOpen(false);
    setOutletContext({});
  }, [setOutletContext]);

  const openRemoveModal = useCallback(
    (journal) => {
      setOutletContext({ journal });
      setRemoveModalOpen(true);
    },
    [setOutletContext]
  );

  const openEditModal = useCallback(
    (journal) => {
      setOutletContext({ journal });
      setCreateModalOpen(true);
    },
    [setOutletContext]
  );

  const [currentPage, handlePageChange] = usePagination();
  const { debouncedSearch, handleSearch, search } = useSearch();

  const fetchJournals = useCallback(() => {
    API.Journals.findAll({
      skip: (currentPage - 1) * limit,
      take: limit,
      search: debouncedSearch,
    }).then(setJournals);
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  useEffect(() => {
    API.Journals.countTotal(debouncedSearch).then(setTotalCount);
  }, [debouncedSearch]);

  return (
    <>
      <Paper className={styles.container}>
        <h1>Ваші журнали {totalCount > 1 && `(${totalCount})`}</h1>

        <div className={styles.toolbar}>
          <Input
            onChange={handleSearch}
            placeholder="Пошук..."
            value={search}
          />
          <Button onClick={openCreateModal} type="button">
            <BiBookAdd size={24} />
            Створити журнал
          </Button>
        </div>

        {!!journals.length && (
          <ul className={styles.list}>
            {journals.map((journal) => (
              <Journal
                editable
                journal={journal}
                key={journal.id}
                onEdit={openEditModal}
                onRemove={openRemoveModal}
              />
            ))}
          </ul>
        )}

        {!journals.length && !debouncedSearch && (
          <Placeholder onCreate={openCreateModal} />
        )}

        {!journals.length && !!debouncedSearch && (
          <SearchPlaceholder />
        )}

        <Paginator
          className={styles.paginator}
          currentPage={currentPage}
          limit={limit}
          onChange={handlePageChange}
          total={totalCount}
        />
      </Paper>

      {createModalOpen && (
        <CreateJournalDialog
          onClose={closeCreateModal}
          onEdit={fetchJournals}
        />
      )}

      {removeModalOpen && (
        <RemoveJournalDialog
          onClose={closeRemoveModal}
          onDelete={fetchJournals}
        />
      )}
    </>
  );
}

export default Journals;
