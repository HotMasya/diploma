// Modules
import { useCallback, useMemo } from 'react';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';
import { BsArrowLeft } from 'react-icons/bs';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

// API
import API from 'API';

// Components
import JournalThumbnail from 'Components/JournalThumbnail';
import HeaderProfile from 'Components/HeaderProfile';
import IconButton from 'Components/IconButton';
import Dropdown from 'Components/Dropdown';

// Constants
import { GREY } from 'Constants/colors';

// Hooks
import { useNavigate } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { useLoadCurrentUser } from '../../../../../../Hooks/useLoadCurrentUser';

/**
 * @param {{ journal: import('Models/Journal').default }} props
 */
function Header(props) {
  const { journal, onCopyJournal, onRemove, onUpdate, onManageAccess } = props;

  const [user] = useLoadCurrentUser();

  const navigate = useNavigate();

  const isOwner = user.id === journal.teacher.user.id;

  const options = useMemo(() => {
    const options = [];

    if (isOwner) {
      options.push(
        {
          label: 'Керування доступом',
          value: 'manage-access',
        },
        {
          label: 'Редагувати',
          value: 'update',
        }
      );
    }

    options.push(
      {
        label: 'Створити копію',
        value: 'create-copy',
      },
      {
        separator: true,
      },
      {
        label: 'Завантажити CSV',
        value: 'download-csv',
      },
      {
        label: 'Завантажити CSV логи',
        value: 'download-csv-logs',
      }
    );

    if (isOwner) {
      options.push(
        {
          separator: true,
        },
        {
          className: styles.alert,
          label: 'Видалити',
          value: 'remove',
        }
      );
    }

    return options;
  }, [isOwner]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleLogsDownload = useCallback(() => {
    const request = API.Logs.downloadLogs(journal.id);

    toast.promise(request, {
      pending: 'Обробляємо запит...',
      success: 'Найбличим часом файл буде завантажено.',
      error: {
        render({ data }) {
          return (
            <>
              <b>Сталася помилка!</b> {API.parseError(data).message}.
            </>
          );
        },
      },
    });
  }, [journal]);

  const handleDownload = useCallback(() => {
    const request = API.Journals.downloadJournalCsv(journal.id);

    toast.promise(request, {
      pending: 'Обробляємо запит...',
      success: 'Найбличим часом файл буде завантажено.',
      error: {
        render({ data }) {
          return (
            <>
              <b>Сталася помилка!</b> {API.parseError(data).message}.
            </>
          );
        },
      },
    });
  }, [journal]);

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'update':
          onUpdate();
          break;

        case 'remove':
          onRemove();
          break;

        case 'create-copy':
          onCopyJournal();
          break;

        case 'download-csv':
          handleDownload();
          break;

        case 'download-csv-logs':
          handleLogsDownload();
          break;

        case 'manage-access':
          onManageAccess();
          break;

        default:
          alert(`${value} is not implemented yet`);
          break;
      }
    },
    [handleDownload, handleLogsDownload, onCopyJournal, onManageAccess, onRemove, onUpdate]
  );

  const dropdownTarget = (
    <IconButton>
      <IoEllipsisVerticalSharp size={22} />
    </IconButton>
  );

  return (
    <header className={styles.header}>
      <div className={styles.details}>
        <IconButton
          className={styles.back}
          onClick={handleGoBack}
          title="Повернутись назад"
        >
          <BsArrowLeft color={GREY._700} size={24} />
        </IconButton>
        <JournalThumbnail journal={journal} size={72} />
        <div>
          <h2 className={styles.title}>
            {journal.name}
            {!isOwner && (
              <span className={styles.hint}>(Обмежений доступ)</span>
            )}
            <Dropdown
              options={options}
              onSelect={handleSelect}
              targetElement={dropdownTarget}
            />
          </h2>
          <p>
            <span className={styles.badge}>{journal.group.name}</span>
            &nbsp; &#x25cf; &nbsp;
            <span>
              останні зміни:&nbsp;
              {formatRelative(journal.updatedAt, new Date(), {
                locale: ukLocale,
              })}
            </span>
            {!isOwner && (
              <>
                &nbsp; &#x25cf; &nbsp;
                <span className={styles.badge}>
                  Власник: {journal.teacher.user.fullName}
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <HeaderProfile />
    </header>
  );
}

export default Header;
