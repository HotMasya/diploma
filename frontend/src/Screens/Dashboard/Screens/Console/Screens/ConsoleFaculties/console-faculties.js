// Modules
import { useOutletContext } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { IoAddSharp } from 'react-icons/io5';

// API
import API from 'API';

// Components
import Table from 'Components/Table';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Paginator from 'Components/Paginator';
import FacultyDetailsDialog from './Components/FacultyDetailsDialog';
import RemoveFacultyDialog from './Components/RemoveFacultyDialog';

// Constants
import { columns } from './columns-config';
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

// Hooks
import { useSorting } from 'Hooks/useSorting';
import { usePagination } from 'Hooks/usePagination';
import { useSearch } from 'Hooks/useSearch';

// Styles
import styles from '../ConsoleUsers/styles.module.scss';

const limit = 10;

function ConsoleFaculties() {
  const [faculties, setFaculties] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const [user] = useUserContext();

  const [, setOutletContext] = useOutletContext();
  const [order, handleSortingChange] = useSorting();
  const [currentPage, handlePageChange] = usePagination();
  const { debouncedSearch, handleSearch, search } = useSearch();

  const closeRemoveModal = useCallback(() => setRemoveModalOpen(false), []);
  const closeDetailsModal = useCallback(() => setDetailsModalOpen(false), []);

  const openDetailsModal = useCallback(() => {
    setOutletContext({});
    setDetailsModalOpen(true);
  }, [setOutletContext]);

  const tableMeta = useMemo(
    () => ({
      setDetailsModalOpen,
      setRemoveModalOpen,
    }),
    []
  );

  const fetchGroups = useCallback(
    async () =>
      API.Faculties.findAll({
        skip: (currentPage - 1) * limit,
        take: limit,
        search: debouncedSearch,
        order,
      }).then(setFaculties),
    [currentPage, debouncedSearch, order]
  );

  useEffect(() => {
    fetchGroups().catch((err) => {
      const message = API.parseError(err).message;
      toast(message, { toastId: 'fetch-faculties-error' });
    });
  }, [fetchGroups]);

  useEffect(() => {
    API.Faculties.countTotal(debouncedSearch).then(setTotalCount);
  }, [debouncedSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Input onChange={handleSearch} placeholder="Пошук..." value={search} />
        {user.hasPermissions(PERMISSION.CREATE_FACULTIES) && (
          <Button onClick={openDetailsModal}>
            <IoAddSharp size={24} />
            Додати факультет
          </Button>
        )}
      </div>

      <Table
        columns={columns}
        data={faculties}
        meta={tableMeta}
        onSortingChange={handleSortingChange}
      />

      <Paginator
        className={styles.paginator}
        currentPage={currentPage}
        limit={limit}
        onChange={handlePageChange}
        total={totalCount}
      />

      {detailsModalOpen && (
        <FacultyDetailsDialog
          onClose={closeDetailsModal}
          onUpdate={fetchGroups}
        />
      )}

      {removeModalOpen && (
        <RemoveFacultyDialog
          onClose={closeRemoveModal}
          onDelete={fetchGroups}
        />
      )}
    </div>
  );
}

export default ConsoleFaculties;
