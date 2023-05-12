// Modules
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// API
import API from 'API';

// Components
import ConsoleGroupDetails from './console-group-details';

// Config
import { ROUTES } from 'Config/routes';

// Hooks
import { useSorting } from 'Hooks/useSorting';
import { useSearch } from 'Hooks/useSearch';
import { usePagination } from 'Hooks/usePagination';

const limit = 10;

function ConsoleGroupDetailsContainer() {
  const { groupId } = useParams();

  const [group, setGroup] = useState();
  const [students, setStudents] = useState();

  const navigate = useNavigate();

  const [order, handleSort] = useSorting();
  const { search, debouncedSearch, handleSearch } = useSearch();
  const [currentPage, handlePageChange] = usePagination();

  const fetchGroup = useCallback(() => {
    API.Groups.findOne(groupId)
      .then(setGroup)
      .catch(() => {
        toast.error(
          'Під час завантаження групи сталася помилка. Можливо у вас недостатньо прав для перегляду деталей групи.'
        );
        navigate(ROUTES.dashboard);
      });

    API.Students.findAll({
      skip: (currentPage - 1) * limit,
      take: limit,
      search: debouncedSearch,
      order,
      groupId: group?.id,
    }).then(setStudents);
  }, [currentPage, debouncedSearch, group?.id, groupId, navigate, order]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  if (!group) return null;

  return (
    <ConsoleGroupDetails
      currentPage={currentPage}
      group={group}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      onSort={handleSort}
      onUpdate={fetchGroup}
      search={search}
      students={students}
    />
  );
}

export default ConsoleGroupDetailsContainer;
