// Modules
import { useOutletContext } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { BiBookAdd } from 'react-icons/bi';

// API
import API from 'API';

// Components
import Table from 'Components/Table';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Paginator from 'Components/Paginator';
import DepartmentDetailsDialog from './Components/DepartmentDetailsDialog';
import RemoveDepartmentDialog from './Components/RemoveDepartmentDialog';

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

function ConsoleDepartments() {
  const [departments, setDepartments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const [, setOutletContext] = useOutletContext();
  const [user] = useUserContext();

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
      API.Departments.findAll({
        skip: (currentPage - 1) * limit,
        take: limit,
        search: debouncedSearch,
        order,
      }).then(setDepartments),
    [currentPage, debouncedSearch, order]
  );

  useEffect(() => {
    fetchGroups().catch((err) => {
      const message = API.parseError(err).message;
      toast(message, { toastId: 'fetch-groups-error' });
    });
  }, [fetchGroups]);

  useEffect(() => {
    API.Departments.countTotal(debouncedSearch).then(setTotalCount);
  }, [debouncedSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Input onChange={handleSearch} placeholder="Пошук..." value={search} />
        {user.hasPermissions(PERMISSION.CREATE_DEPARTMENTS) && (
          <Button onClick={openDetailsModal}>
            <BiBookAdd size={24} /> Додати кафедру
          </Button>
        )}
      </div>

      <Table
        columns={columns}
        data={departments}
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
        <DepartmentDetailsDialog
          onClose={closeDetailsModal}
          onUpdate={fetchGroups}
        />
      )}

      {removeModalOpen && (
        <RemoveDepartmentDialog
          onClose={closeRemoveModal}
          onDelete={fetchGroups}
        />
      )}
    </div>
  );
}

export default ConsoleDepartments;
