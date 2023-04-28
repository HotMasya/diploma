// Modules
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdGroupAdd } from 'react-icons/md';

// API
import API from 'API';

// Components
import Table from 'Components/Table';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Paginator from 'Components/Paginator';
import DeleteGroupDialog from './Components/DeleteGroupDialog';
import CreateGroupDialog from './Components/CreateGroupDialog';
import UpdateCuratorDialog from './Components/UpdateCuratorDialog';

// Constants
import { columns } from './columns-config';
import { ORDER } from 'Constants/order';

// Hooks
import { useDebounceValue } from 'Hooks/useDebounceValue';

// Styles
import styles from '../ConsoleUsers/styles.module.scss';
import DeleteCuratorDialog from './Components/DeleteCuratorDialog/delete-curator-dialog';

const limit = 10;

function ConsoleGroups() {
  const [groups, setGroups] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [curatorModalOpen, setCuratorModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteCuratorModalOpen, setDeleteCuratorModalOpen] = useState(false);

  const searchValue = useDebounceValue(searchParams.get('q'));
  const currentPage = Number(searchParams.get('p')) || 1;
  const order = searchParams.get('o') || '';

  const handleDeleteModalClose = useCallback(
    () => setDeleteModalOpen(false),
    []
  );
  const handleCuratorModalClose = useCallback(
    () => setCuratorModalOpen(false),
    []
  );

  const handleCreateModalClose = useCallback(
    () => setCreateModalOpen(false),
    []
  );

  const handleDeleteCuratormodalClose = useCallback(
    () => setDeleteCuratorModalOpen(false),
    []
  );

  const handleCreateModalOpen = useCallback(() => setCreateModalOpen(true), []);

  const tableMeta = useMemo(
    () => ({
      setDeleteModalOpen,
      setCuratorModalOpen,
      setDeleteCuratorModalOpen,
    }),
    []
  );

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

  const fetchGroups = useCallback(
    async () =>
      API.Groups.findAll({
        skip: (currentPage - 1) * limit,
        take: limit,
        search: searchValue,
        order,
      })
        .then((groups) => {
          setGroups(groups);

          if (Math.ceil(totalCount / limit) < currentPage) {
            handlePageChange(currentPage - 1);
          }

          return API.Groups.countTotal(searchValue);
        })
        .then(setTotalCount),
    [currentPage, handlePageChange, order, searchValue, totalCount]
  );

  useEffect(() => {
    fetchGroups().catch((err) => {
      const message = API.parseError(err).message;
      toast(message, { toastId: 'fetch-groups-error' });
    });
  }, [currentPage, fetchGroups, order, searchValue]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Input
          onChange={handleSearch}
          placeholder="Пошук..."
          value={searchParams.get('q') || ''}
        />
        <Button onClick={handleCreateModalOpen}>
          <MdGroupAdd size={24} /> Додати групу
        </Button>
      </div>

      <Table
        columns={columns}
        data={groups}
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
        <DeleteGroupDialog
          onClose={handleDeleteModalClose}
          onDelete={fetchGroups}
        />
      )}

      {createModalOpen && (
        <CreateGroupDialog onClose={handleCreateModalClose} />
      )}

      {curatorModalOpen && (
        <UpdateCuratorDialog
          onClose={handleCuratorModalClose}
          onUpdate={fetchGroups}
        />
      )}

      {deleteCuratorModalOpen && (
        <DeleteCuratorDialog
          onClose={handleDeleteCuratormodalClose}
          onDelete={fetchGroups}
        />
      )}
    </div>
  );
}

export default ConsoleGroups;
