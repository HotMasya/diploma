// Modules
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import isFunction from 'lodash/isFunction';
import { IoClose } from 'react-icons/io5';

// API
import API from 'API';

// Components
import Dialog from 'Components/Dialog';
import Button, { BUTTON_VARIANT } from 'Components/Button';
import Avatar from 'Components/Avatar/avatar';
import Input from 'Components/Input/input';
import IconButton from 'Components/IconButton';

// Hooks
import { useDebounceValue } from 'Hooks/useDebounceValue';

// Styles
import styles from './styles.module.scss';

function Option(props) {
  const { curator, onSelect } = props;

  return (
    <li className={styles.option} onClick={() => onSelect(curator)}>
      <Avatar user={curator.user} />
      {curator.user.fullName}
    </li>
  );
}

function SelectedOption(props) {
  const { curator, onDelete } = props;

  return (
    <div className={styles.selected}>
      <Avatar user={curator.user} />
      {curator.user.fullName}

      <IconButton onClick={onDelete}>
        <IoClose size={24} />
      </IconButton>
    </div>
  );
}

function UpdateCuratorDialog(props) {
  const { onClose, onUpdate } = props;

  const [pending, setPending] = useState(false);
  const [pendingSearch, setPendingSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);
  const [curator, setCurator] = useState(null);

  const [outletContext] = useOutletContext();

  const group = get(outletContext, 'group');

  const modalRef = useRef();

  const debouncedSearch = useDebounceValue(search);

  const handleSearchChange = useCallback(
    ({ target }) => setSearch(target.value),
    []
  );

  const handleCuratorRemove = useCallback(() => setCurator(null), []);

  const handleUpdate = useCallback(
    (name) => {
      if (pending) return;

      setPending(true);

      const request = API.Groups.create({ name })
        .then((group) => {
          modalRef.current.close();
          if (isFunction(onUpdate)) {
            onUpdate();
          }
        })
        .finally(() => setPending(false));

      toast.promise(
        request,
        {
          success: 'Куратора групи було успішно змінено',
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
          toastId: 'change-group-curator',
        }
      );
    },
    [onUpdate, pending]
  );

  useEffect(() => {
    setPendingSearch(true);

    API.Teachers.findAll({
      take: 10,
      search: debouncedSearch,
    })
      .then(setOptions)
      .finally(() => setPendingSearch(false));
  }, [debouncedSearch]);

  const description = (
    <>
      Куратора для групи <b>{group.name}</b> буде змінено. Поточний куратор
      групи: <b>{group.curator?.user.fullName || 'відстуній'}</b>.
    </>
  );

  let listContent;

  switch (true) {
    case pendingSearch:
      listContent = <li className={styles.empty}>Завантаження опцій...</li>;
      break;

    case isEmpty(options):
      listContent = <li className={styles.empty}>Немає доступних опцій</li>;
      break;

    default:
      listContent = map(options, (curator) => (
        <Option curator={curator} key={curator.id} onSelect={setCurator} />
      ));
      break;
  }

  return (
    <Dialog
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Змінити куратора"
    >
      <div className={styles.content}>
        {curator ? (
          <SelectedOption curator={curator} onDelete={handleCuratorRemove} />
        ) : (
          <>
            <Input
              value={search}
              onChange={handleSearchChange}
              placeholder="Пошук..."
            />

            <ul>{listContent}</ul>
          </>
        )}

        <div className={styles.buttons}>
          <Button disabled={!curator} onClick={handleUpdate}>
            Створити
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

export default UpdateCuratorDialog;
