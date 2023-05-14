// Modules
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

// API
import API from 'API';

// Components
import Dialog from 'Components/Dialog';
import Button, { BUTTON_VARIANT } from 'Components/Button';
import Avatar from 'Components/Avatar/avatar';
import Input from 'Components/Input/input';

// Hooks
import { useDebounceValue } from 'Hooks/useDebounceValue';

// Styles
import styles from './styles.module.scss';
import { idealNoun } from '../../../../../../Helpers/idealNoun';

function Option(props) {
  const { onSelect, teacher } = props;

  return (
    <li className={styles.option} onClick={() => onSelect(teacher)}>
      <Avatar user={teacher.user} size={48} />
      <div className={styles.teacher}>
        <p>{teacher.user.fullName}</p>
        <span>{teacher.user.email}</span>
      </div>
    </li>
  );
}

function OptionsList(props) {
  const { onSelect, options, pending } = props;

  let listContent;

  switch (true) {
    case pending:
      listContent = <li className={styles.empty}>Завантаження опцій...</li>;
      break;

    case isEmpty(options):
      listContent = <li className={styles.empty}>Немає доступних опцій</li>;
      break;

    default:
      listContent = map(options, (teacher) => (
        <Option teacher={teacher} key={teacher.id} onSelect={onSelect} />
      ));
      break;
  }

  return <ul>{listContent}</ul>;
}

function AddHelpersDialog(props) {
  const { onClose, journal } = props;

  const [pending, setPending] = useState(false);
  const [pendingSearch, setPendingSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const modalRef = useRef();

  const debouncedSearch = useDebounceValue(search);

  const handleSearchChange = useCallback(
    ({ target }) => setSearch(target.value),
    []
  );

  const handleAddStudent = useCallback(
    (student) => setTeachers((prev) => [...prev, student]),
    []
  );

  const handleRemoveStudent = useCallback((student) => {
    setTeachers((prev) => {
      const filteredStudents = prev.filter(({ id }) => id !== student.id);

      return filteredStudents;
    });
  }, []);

  const handleUpdate = useCallback(() => {
    if (pending) return;

    setPending(true);

    const helperIds = map(teachers, 'id');

    const request = API.Journals.updateHelpers(journal.id, { helperIds })
      .then(() => {
        modalRef.current.close();
      })
      .finally(() => setPending(false));

    toast.promise(
      request,
      {
        success: 'Список асистентів було успішно оновлено',
        error: {
          render({ data }) {
            return (
              <>
                <b>Сталася помилка!</b> {API.parseError(data).message}.
              </>
            );
          },
        },
      },
      {
        autoClose: 3000,
        toastId: 'add-student-to-group',
      }
    );
  }, [journal, pending, teachers]);

  useEffect(() => {
    setPendingSearch(true);

    const excludeIds = map(teachers, 'id');

    excludeIds.push(journal.teacher.id);

    API.Teachers.findAll({
      take: 8,
      search: debouncedSearch,
      excludeIds,
    })
      .then(setOptions)
      .finally(() => setPendingSearch(false));
  }, [debouncedSearch, journal, teachers]);

  useEffect(() => {
    setPending(true);
    API.Journals.findHelpers(journal.id)
      .then(setTeachers)
      .finally(() => setPending(false));
  }, [journal.id]);

  const description = (
    <>
      До редагування вашого журналу ви можете залучити інших викладачів. У
      будь-який момент часу ви можете також забрати у них доступ.
      <br />
      <br />
      На даний момент доступ до журналу, окрім вас,&nbsp;
      <b>
        {teachers.length > 0
          ? `будуть мати ще ${teachers.length} ${idealNoun(teachers.length, 'викладач', 'викладачів')}`
          : 'не має ніхто'}
      </b>
      .
    </>
  );

  return (
    <Dialog
      className={styles.dialog}
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Керування доступом"
    >
      <div className={styles.content}>
        <Input
          onChange={handleSearchChange}
          placeholder="Пошук..."
          value={search}
        />
        <div className={styles.lists}>
          <OptionsList
            onSelect={handleAddStudent}
            options={options}
            pending={pendingSearch}
          />
          <div className={styles.arrows}>
            <BsArrowRight size={24} />
            <BsArrowLeft size={24} />
          </div>
          <OptionsList
            onSelect={handleRemoveStudent}
            options={teachers}
            pending={pendingSearch}
          />
        </div>
        <div className={styles.buttons}>
          <Button onClick={handleUpdate}>
            Зберегти
          </Button>
          <Button
            onClick={() => modalRef.current?.close()}
            type="button"
            variant={BUTTON_VARIANT.secondary}
          >
            Скасувати
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default AddHelpersDialog;
