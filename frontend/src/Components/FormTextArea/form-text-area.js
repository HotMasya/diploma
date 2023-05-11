// Components
import ErrorMessage from 'Components/ErrorMessage';
import FieldGroup from 'Components/FieldGroup';
import Label from 'Components/Label';
import TextArea from 'Components/TextArea';

// Helpers
import getErrorFromMeta from 'Helpers/getErrorFromMeta';

function FormTextArea(props) {
  const { disabled, id, input, labelText, meta, placeholder } = props;

  const { showError } = getErrorFromMeta(meta);

  return (
    <FieldGroup>
      {labelText && <Label htmlFor={`${id}-${input.name}`}>{labelText}</Label>}
      <TextArea
        disabled={disabled}
        hasError={showError}
        placeholder={placeholder}
        {...input}
      />
      <ErrorMessage meta={meta} />
    </FieldGroup>
  );
}

export default FormTextArea;
