// API
import API from 'API';

// Components
import Input from 'Components/Input';
import Journal from './Components/Journal';
import Paginator from 'Components/Paginator';
import Paper from 'Components/Paper/paper';
import Placeholder from './Components/Placeholder';
import SearchPlaceholder from 'Components/SearchPlaceholder';

// Hooks
import { useCallback, useEffect, useState } from 'react';
import { usePagination } from 'Hooks/usePagination';
import { useSearch } from 'Hooks/useSearch';

// Styles
import styles from './styles.module.scss';

const limit = 4;

function Journals() {
  const [journals, setJournals] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, handlePageChange] = usePagination();
  const { debouncedSearch, handleSearch, search } = useSearch();

  const fetchJournals = useCallback(() => {
    API.Journals.getStudentGrades({
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
    <Paper className={styles.container}>
      <h1>Журнали з вашими оцінками {totalCount > 1 && `(${totalCount})`}</h1>

      <div className={styles.toolbar}>
        <Input onChange={handleSearch} placeholder="Пошук..." value={search} />
      </div>

      {!!journals.length && (
        <ul className={styles.list}>
          {journals.map((journal) => (
            <Journal
              journal={journal}
              key={journal.id}
            />
          ))}
        </ul>
      )}

      {!journals.length && !debouncedSearch && <Placeholder />}

      {!journals.length && !!debouncedSearch && <SearchPlaceholder />}

      <Paginator
        className={styles.paginator}
        currentPage={currentPage}
        limit={limit}
        onChange={handlePageChange}
        total={totalCount}
      />
    </Paper>
  );
}

export default Journals;
