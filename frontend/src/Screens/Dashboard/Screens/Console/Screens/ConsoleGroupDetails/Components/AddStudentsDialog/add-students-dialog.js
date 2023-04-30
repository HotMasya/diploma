// Modules
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import isFunction from 'lodash/isFunction';
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

function Option(props) {
  const { onSelect, student } = props;

  return (
    <li className={styles.option} onClick={() => onSelect(student)}>
      <Avatar user={student.user} size={48} />
      <div className={styles.student}>
        <p>{student.user.fullName}</p>
        <span>{student.user.email}</span>
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
      listContent = map(options, (student) => (
        <Option student={student} key={student.id} onSelect={onSelect} />
      ));
      break;
  }

  return <ul>{listContent}</ul>;
}

function AddStudentsDialog(props) {
  const { onClose, onUpdate } = props;

  const [pending, setPending] = useState(false);
  const [pendingSearch, setPendingSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);
  const [students, setStudents] = useState([]);

  const [outletContext] = useOutletContext();

  const group = get(outletContext, 'group');

  const modalRef = useRef();

  const debouncedSearch = useDebounceValue(search);

  const handleSearchChange = useCallback(
    ({ target }) => setSearch(target.value),
    []
  );

  const handleAddStudent = useCallback(
    (student) => setStudents((prev) => [...prev, student]),
    []
  );

  const handleRemoveStudent = useCallback((student) => {
    setStudents((prev) => {
      const filteredStudents = prev.filter(({ id }) => id !== student.id);

      return filteredStudents;
    });
  }, []);

  const handleUpdate = useCallback(() => {
    if (pending) return;

    setPending(true);

    const studentIds = map(students, 'id');

    const request = API.Groups.addStudents(group.id, studentIds)
      .then(() => {
        modalRef.current.close();
        if (isFunction(onUpdate)) {
          onUpdate();
        }
      })
      .finally(() => setPending(false));

    toast.promise(
      request,
      {
        success: 'Студентів було успішно додано до групи',
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
  }, [group.id, onUpdate, pending, students]);

  useEffect(() => {
    setPendingSearch(true);

    API.Students.findAll({
      take: 8,
      search: debouncedSearch,
      groupId: '',
      excludeIds: map(students, 'id'),
    })
      .then(setOptions)
      .finally(() => setPendingSearch(false));
  }, [debouncedSearch, group.curator, group.id, students]);

  const description = (
    <>
      До групи буде додано студента. Також, додати студента до конкретної групи
      можна в налаштуваннях користувача.
    </>
  );

  return (
    <Dialog
      className={styles.dialog}
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Додати студентів"
    >
      <div className={styles.content}>
        <Input onChange={handleSearchChange} placeholder="Пошук..." value={search} />
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
            options={students}
            pending={pendingSearch}
          />
        </div>
        <div className={styles.buttons}>
          <Button disabled={isEmpty(students)} onClick={handleUpdate}>
            Додати студентів
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

export default AddStudentsDialog;
