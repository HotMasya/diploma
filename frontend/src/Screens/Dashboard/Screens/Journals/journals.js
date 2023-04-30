
// Modules
import { BiBookAdd } from 'react-icons/bi';

// Hooks
import { useCallback, useState } from 'react';
import { usePagination } from 'Hooks/usePagination';
import { useSearch } from 'Hooks/useSearch';

// Components
import CreateJournalDialog from './Components/CreateJournalDialog';
import Paper from 'Components/Paper/paper';
import Input from 'Components/Input';
import Button from 'Components/Button';

// Styles
import styles from './styles.module.scss';

const limit = 5;

function Journals() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const closeCreateModal = useCallback(() => setCreateModalOpen(false), []);
  const openCreateModal = useCallback(() => setCreateModalOpen(true), []);

  const [currentPage, handlePageChange] = usePagination();
  const { debouncedSearch, handleSearch, search } = useSearch();

  return (
    <>
      <Paper className={styles.container}>
        <h1>Ваші журнали</h1>

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
      </Paper>
      {createModalOpen && <CreateJournalDialog onClose={closeCreateModal} />}
    </>
  );
}

export default Journals;
