// Components
import ErrorMessage from 'Components/ErrorMessage';
import FieldGroup from 'Components/FieldGroup';
import Label from 'Components/Label';
import getErrorFromMeta from 'Helpers/getErrorFromMeta';
import Input from 'Components/Input';

function FormInput(props) {
  const { disabled, id, input, labelText, meta, placeholder } = props;

  const { showError } = getErrorFromMeta(meta);

  return (
    <FieldGroup>
      {labelText && <Label htmlFor={`${id}-${input.name}`}>{labelText}</Label>}
      <Input disabled={disabled} hasError={showError} placeholder={placeholder} {...input} />
      <ErrorMessage meta={meta} />
    </FieldGroup>
  );
}

export default FormInput;
