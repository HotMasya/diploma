// Modules
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

// Constants
import { columns } from './columns-config';
import { ORDER } from 'Constants/order';

// Hooks
import { useDebounceValue } from 'Hooks/useDebounceValue';

// Styles
import styles from './styles.module.scss';

const limit = 10;

function ConsoleUsers() {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const searchValue = useDebounceValue(searchParams.get('q'));
  const currentPage = Number(searchParams.get('p')) || 1;
  const order = searchParams.get('o') || '';

  const handleDeleteModalClose = useCallback(
    () => setDeleteModalOpen(false),
    []
  );
  const handlePasswordModalClose = useCallback(
    () => setPasswordModalOpen(false),
    []
  );

  const tableMeta = useMemo(() => ({
    setDeleteModalOpen,
    setPasswordModalOpen,
  }), []);

  const setParamsWithoutReplace = useCallback(
    (func) => setSearchParams(func, { replace: true }),
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage) => {
      setParamsWithoutReplace((prev) => {
        if (newPage > 1) {
          prev.set('p', newPage);
        } else {
          prev.delete('p');
        }

        return prev;
      });
    },
    [setParamsWithoutReplace]
  );

  const handleSearch = useCallback(
    ({ target }) => {
      setParamsWithoutReplace((prev) => {
        if (target.value) {
          prev.set('q', target.value);
        } else {
          prev.delete('q');
        }

        handlePageChange(1);

        return prev;
      });
    },
    [handlePageChange, setParamsWithoutReplace]
  );

  const handleSortingChange = useCallback(
    (sort) => {
      setParamsWithoutReplace((prev) => {
        if (!sort.length) {
          prev.delete('o');
        } else {
          const { id, desc } = sort[0];
          const order = `${id} ${desc ? ORDER.desc : ORDER.asc}`;

          prev.set('o', order);
        }

        return prev;
      });
    },
    [setParamsWithoutReplace]
  );

  const fetchUsers = useCallback(
    async () =>
      API.Users.findAll({
        skip: (currentPage - 1) * limit,
        take: limit,
        search: searchValue,
        order,
      })
        .then((users) => {
          setUsers(users);

          if (Math.ceil(totalCount / limit) < currentPage) {
            handlePageChange(currentPage - 1);
          }

          return API.Users.countTotal(searchValue);
        })
        .then(setTotalCount),
    [currentPage, handlePageChange, order, searchValue, totalCount]
  );

  useEffect(() => {
    fetchUsers().catch((err) => {
      const message = API.parseError(err).message;
      toast(message, { toastId: 'fetch-users-error' });
    });
  }, [currentPage, fetchUsers, order, searchValue]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Input
          onChange={handleSearch}
          placeholder="Пошук..."
          value={searchParams.get('q') || ''}
        />
        <Button>
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
    </div>
  );
}

export default ConsoleUsers;
