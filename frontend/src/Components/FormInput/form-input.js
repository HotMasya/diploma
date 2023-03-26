// Components
import ErrorMessage from 'Components/ErrorMessage';
import FieldGroup from 'Components/FieldGroup';
import Input from '../Input/input';

function FormInput(props) {
  const { id, input, labelText, meta } = props;

  return (
    <FieldGroup>
      {labelText && <label htmlFor={`${id}-${input.name}`}>{labelText}</label>}
      <Input {...input} />
      <ErrorMessage meta={meta} />
    </FieldGroup>
  );
}

export default FormInput;
