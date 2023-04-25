// Modules
import { Form } from 'react-final-form';
import { useCallback } from 'react';

// Components
import ConsoleGroupDetails from './console-group-details';

function ConsoleGroupDetailsContainer() {
  const handleSumbit = useCallback((values) => {
    console.log(values);
  }, []);

  return <Form component={ConsoleGroupDetails} onSubmit={handleSumbit} />;
}

export default ConsoleGroupDetailsContainer;
