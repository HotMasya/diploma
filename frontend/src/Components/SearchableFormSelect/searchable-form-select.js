// Modules
import { useEffect, useState } from 'react';
import isArray from 'lodash/isArray';
import map from 'lodash/map';

// Components
import ErrorMessage from 'Components/ErrorMessage';
import FieldGroup from 'Components/FieldGroup';
import Label from 'Components/Label';
import Select from 'Components/Select';

// Helpers
import getErrorFromMeta from 'Helpers/getErrorFromMeta';

// Hooks
import { useDebounceValue } from 'Hooks/useDebounceValue';

const defaultFilter = {
  take: 10,
};

function SearchableFormSelect(props) {
  const {
    disabled,
    formatMultiValue,
    formatOption,
    id,
    input,
    labelText,
    mapToOption,
    meta,
    placeholder,
    request,
    title,
  } = props;

  const [options, setOptions] = useState([]);
  const [pending, setPending] = useState(false);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounceValue(search);

  const { showError } = getErrorFromMeta(meta);

  useEffect(() => {
    setPending(true);

    const filter = { ...defaultFilter };

    if (debouncedSearch) {
      filter.search = debouncedSearch;
    }

    if (isArray(input.value) && input.value.length) {
      filter.excludeIds = map(input.value, 'value');
    } else if (input.value) {
      filter.excludeIds = [input.value.value];
    }

    request(filter)
      .then((groups) => groups.map(mapToOption))
      .then(setOptions)
      .finally(() => setPending(false));
  }, [debouncedSearch, input.value, mapToOption, request]);

  return (
    <FieldGroup>
      {labelText && <Label htmlFor={`${id}-${input.name}`}>{labelText}</Label>}
      <Select
        disabled={disabled}
        formatMultiValue={formatMultiValue}
        formatOption={formatOption}
        hasError={showError}
        isSearchable
        onSearch={setSearch}
        options={options}
        pending={pending}
        placeholder={placeholder}
        title={title}
        {...input}
      />
      <ErrorMessage meta={meta} />
    </FieldGroup>
  );
}

SearchableFormSelect.defaultProps = {
  mapToOption: ({ id, name }) => ({ label: name, value: id }),
};

export default SearchableFormSelect;
