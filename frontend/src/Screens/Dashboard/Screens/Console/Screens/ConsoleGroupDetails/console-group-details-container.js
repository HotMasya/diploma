// Modules
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// API
import API from 'API';

// Components
import ConsoleGroupDetails from './console-group-details';

// Hooks
import { useSorting } from 'Hooks/useSorting';
import { useSearch } from 'Hooks/useSearch';
import { usePagination } from 'Hooks/usePagination';

const limit = 10;

function ConsoleGroupDetailsContainer() {
  const { groupId } = useParams();

  const [group, setGroup] = useState();
  const [students, setStudents] = useState();
  const [order, handleSort] = useSorting();
  const { search, debouncedSearch, handleSearch } = useSearch();
  const [currentPage, handlePageChange] = usePagination();

  const fetchGroup = useCallback(() => {
    API.Groups.findOne(groupId).then(setGroup);

    API.Students.findAll({
      skip: (currentPage - 1) * limit,
      take: limit,
      search: debouncedSearch,
      order,
      groupId: group?.id,
    }).then(setStudents);
  }, [currentPage, debouncedSearch, group?.id, groupId, order]);

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
