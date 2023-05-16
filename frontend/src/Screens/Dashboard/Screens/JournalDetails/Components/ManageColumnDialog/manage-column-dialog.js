// Modules
import { Field, Form } from 'react-final-form';
import get from 'lodash/get';
import { useCallback, useMemo, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import cx from 'classnames';
import size from 'lodash/size';
import { BsFillCalculatorFill } from 'react-icons/bs';

// Components
import Button, { BUTTON_VARIANT } from 'Components/Button';
import Dialog from 'Components/Dialog';
import FormInput from 'Components/FormInput';
import Checkbox from 'Components/Checkbox/checkbox';
import Label from 'Components/Label';
import RadioButton from 'Components/RadioButton';

// Context
import { useJournalContext } from 'Context/JournalContext';

// Helpers
import { isRequired } from 'Helpers/isRequired';

// Styles
import styles from './styles.module.scss';
import {
  GRID_COLUMN_TYPE,
  GRID_COLUMN_TYPE_MAP,
} from 'Constants/grid-column-type';
import { GREEN } from 'Constants/colors';

function ColumnOption(props) {
  const { computed, input, labelText } = props;

  return (
    <li className={styles.option}>
      <label>
        <input type="checkbox" {...input} />
        <span>
          {labelText}
          {computed && (
            <BsFillCalculatorFill
              color={GREEN._500}
              size={24}
              title="Поле розраховується автоматично"
            />
          )}
        </span>
      </label>
    </li>
  );
}

function ManageColumnDialog(props) {
  const { journal, onClose, onCreate, onDelete, onSave } = props;

  const [journalContext] = useJournalContext();
  const modalRef = useRef();

  const column = get(journalContext, 'column');

  const initialValues = useMemo(
    () => ({
      title: get(column, 'title', ''),
      visibleForStudents: get(column, 'visibleForStudents', true),
      computedFields: get(column, 'computedFields', []),
      computed: get(column, 'computed', false),
      type: get(column, 'type', GRID_COLUMN_TYPE.string),
    }),
    [column]
  );

  const isEditMode = !!column;

  const handleSubmit = useCallback(
    (values) => {
      const result = {
        computed: values.computed,
        computedFields: values.computedFields,
        editable: true,
        id: column?.id || uuid(),
        title: values.title,
        type: values.type,
        visibleForStudents: values.visibleForStudents,
      };

      if (isEditMode) {
        onSave(result);
      } else {
        onCreate(result);
      }

      modalRef.current.close();
    },
    [column?.id, isEditMode, onCreate, onSave]
  );

  const handleDelete = useCallback(() => {
    onDelete(column);
    modalRef.current.close();
  }, [column, onDelete]);

  const title = isEditMode ? 'Редагувати стовпчик' : 'Додати стовпчик';

  return (
    <Dialog
      className={styles.dialog}
      onClose={onClose}
      ref={modalRef}
      title={title}
    >
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, values }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.pair}>
              <div className={styles.column}>
                <Field
                  component={FormInput}
                  name="title"
                  labelText="Назва"
                  placeholder="Вкажіть назву стовпчика"
                  validate={isRequired()}
                />

                <Field
                  name="visibleForStudents"
                  type="checkbox"
                  render={({ input }) => (
                    <Checkbox
                      labelText="Відображати для студентів"
                      {...input}
                    />
                  )}
                />

                <Field
                  name="computed"
                  type="checkbox"
                  render={({ input }) => (
                    <Checkbox
                      className={styles.checkbox}
                      labelText="Розраховувати автоматично"
                      {...input}
                    />
                  )}
                />

                <div>
                  <Label>Тип даних</Label>
                  <div className={styles.radios}>
                    {GRID_COLUMN_TYPE_MAP.map(({ labelText, value }) => (
                      <Field
                        name="type"
                        type="radio"
                        value={value}
                        key={value}
                        render={({ input }) => (
                          <RadioButton labelText={labelText} {...input} />
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {values.computed && (
                <div className={cx(styles.column, styles.last)}>
                  <Label>Виберіть хоча б одне поле для розрахунку</Label>
                  <Label
                    className={cx(styles.selectedLabel, {
                      [styles.red]: !size(values.computedFields),
                    })}
                  >
                    Вибрано: {size(values.computedFields)}
                  </Label>
                  <ul className={styles.columns}>
                    {journal.columns
                      .filter(
                        ({ id, type, computed, computedFields }) =>
                          id !== column?.id &&
                          (type === GRID_COLUMN_TYPE.number || computed) &&
                          !(computedFields || []).includes(column?.id)
                      )
                      .map((column) => (
                        <Field
                          component={ColumnOption}
                          computed={column.computed}
                          key={column.id}
                          labelText={column.title}
                          name="computedFields"
                          type="checkbox"
                          value={column.id}
                        />
                      ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.buttons}>
              <Button
                disabled={values.computed && !size(values.computedFields)}
                type="submit"
              >
                {isEditMode ? 'Зберегти' : 'Створити'}
              </Button>
              {isEditMode && (
                <Button
                  onClick={handleDelete}
                  variant={BUTTON_VARIANT.destructive}
                >
                  Видалити
                </Button>
              )}
              <Button
                onClick={() => modalRef.current.close()}
                type="button"
                variant={BUTTON_VARIANT.secondary}
              >
                Скасувати
              </Button>
            </div>
          </form>
        )}
      />
    </Dialog>
  );
}

ManageColumnDialog.propTypes = {
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
};

export default ManageColumnDialog;
