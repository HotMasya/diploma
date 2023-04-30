// Modules
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FaUserPlus } from 'react-icons/fa';

// API
import API from 'API';

// Components
import Table from 'Components/Table';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Paginator from 'Components/Paginator';
import DeleteUserDialog from './Components/DeleteUserDialog';
import ChangePasswordDialog from './Components/ChangePasswordDialog';
import CreateUserDialog from './Components/CreateUserDialog';

// Constants
import { columns } from './columns-config';

// Hooks
import { useSorting } from 'Hooks/useSorting';
import { usePagination } from 'Hooks/usePagination';
import { useSearch } from 'Hooks/useSearch';

// Styles
import styles from './styles.module.scss';

const limit = 10;

function ConsoleUsers() {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [order, handleSortingChange] = useSorting();
  const [currentPage, handlePageChange] = usePagination();
  const { debouncedSearch, handleSearch, search } = useSearch();

  const handleDeleteModalClose = useCallback(
    () => setDeleteModalOpen(false),
    []
  );
  const handlePasswordModalClose = useCallback(
    () => setPasswordModalOpen(false),
    []
  );
  const handleCreateModalClose = useCallback(
    () => setCreateModalOpen(false),
    []
  );

  const handleCreateModalOpen = useCallback(() => setCreateModalOpen(true), []);

  const tableMeta = useMemo(
    () => ({
      setDeleteModalOpen,
      setPasswordModalOpen,
    }),
    []
  );

  const fetchUsers = useCallback(
    () =>
      API.Users.findAll({
        skip: (currentPage - 1) * limit,
        take: limit,
        search: debouncedSearch,
        order,
      }).then(setUsers),
    [currentPage, debouncedSearch, order]
  );

  useEffect(() => {
    fetchUsers().catch((err) => {
      const message = API.parseError(err).message;
      toast(message, { toastId: 'fetch-users-error' });
    });
  }, [fetchUsers]);

  useEffect(() => {
    API.Users.countTotal(debouncedSearch).then(setTotalCount);
  }, [debouncedSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Input onChange={handleSearch} placeholder="Пошук..." value={search} />
        <Button onClick={handleCreateModalOpen}>
          <FaUserPlus size={24} /> Додати користувача
        </Button>
      </div>

      <Table
        columns={columns}
        data={users}
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

      {deleteModalOpen && (
        <DeleteUserDialog
          onClose={handleDeleteModalClose}
          onDelete={fetchUsers}
        />
      )}

      {passwordModalOpen && (
        <ChangePasswordDialog onClose={handlePasswordModalClose} />
      )}

      {createModalOpen && (
        <CreateUserDialog onClose={handleCreateModalClose} />
      )}
    </div>
  );
}

export default ConsoleUsers;
