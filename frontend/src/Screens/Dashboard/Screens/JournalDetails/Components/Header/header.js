// Modules
import { useCallback } from 'react';
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

const options = [
  {
    label: 'Керування доступом',
    value: 'manage-access',
  },
  {
    label: 'Редагувати',
    value: 'update',
  },
  {
    separator: true,
  },
  {
    label: 'Завантажити CSV',
    value: 'download-csv',
  },
  {
    separator: true,
  },
  {
    className: styles.alert,
    label: 'Видалити',
    value: 'remove',
  },
];

/**
 * @param {{ journal: import('Models/Journal').default }} props
 */
function Header(props) {
  const { journal, onRemove, onUpdate } = props;

  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

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

        case 'download-csv':
          handleDownload();
          break;

        default:
          alert(`${value} is not implemented yet`);
          break;
      }
    },
    [handleDownload, onRemove, onUpdate]
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
          </p>
        </div>
      </div>

      <HeaderProfile />
    </header>
  );
}

export default Header;
