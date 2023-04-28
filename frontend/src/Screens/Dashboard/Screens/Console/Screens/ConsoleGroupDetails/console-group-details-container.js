// Modules
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// API
import API from 'API';

// Components
import ConsoleGroupDetails from './console-group-details';

function ConsoleGroupDetailsContainer() {
  const { groupId } = useParams();

  const [group, setGroup] = useState();

  const fetchGroup = useCallback(() => {
    API.Groups.findOne(groupId).then(setGroup);
  }, [groupId]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  if (!group) return null;

  return (
    <ConsoleGroupDetails group={group} onUpdate={fetchGroup} />
  );
}

export default ConsoleGroupDetailsContainer;
