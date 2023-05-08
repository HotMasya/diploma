// Modules
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

// Hooks
import { useSorting } from 'Hooks/useSorting';
import { usePagination } from 'Hooks/usePagination';
import { useSearch } from 'Hooks/useSearch';

// Styles
import styles from '../ConsoleUsers/styles.module.scss';
import DeleteCuratorDialog from './Components/DeleteCuratorDialog/delete-curator-dialog';

const limit = 10;

function ConsoleGroups() {
  const [groups, setGroups] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [curatorModalOpen, setCuratorModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteCuratorModalOpen, setDeleteCuratorModalOpen] = useState(false);
  const [user] = useUserContext();

  const [order, handleSortingChange] = useSorting();
  const [currentPage, handlePageChange] = usePagination();
  const { debouncedSearch, handleSearch, search } = useSearch();

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

  const fetchGroups = useCallback(
    async () =>
      API.Groups.findAll({
        skip: (currentPage - 1) * limit,
        take: limit,
        search: debouncedSearch,
        order,
      }).then(setGroups),
    [currentPage, debouncedSearch, order]
  );

  useEffect(() => {
    fetchGroups().catch((err) => {
      const message = API.parseError(err).message;
      toast(message, { toastId: 'fetch-groups-error' });
    });
  }, [fetchGroups]);

  useEffect(() => {
    API.Groups.countTotal(debouncedSearch).then(setTotalCount);
  }, [debouncedSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Input onChange={handleSearch} placeholder="Пошук..." value={search} />
        {!!user.hasPermissions(PERMISSION.CREATE_GROUPS) && (
          <Button onClick={handleCreateModalOpen}>
            <MdGroupAdd size={24} /> Додати групу
          </Button>
        )}
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
