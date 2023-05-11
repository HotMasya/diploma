// Modules
import { useCallback } from 'react';
import { Link, generatePath } from 'react-router-dom';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';
import { BsArrowRight } from 'react-icons/bs';

// Components
import Button from 'Components/Button';
import JournalThumbnail from 'Components/JournalThumbnail';

// Config
import { ROUTES } from 'Config/routes';

// Styles
import styles from './styles.module.scss';

/**
 * @param {{ journal: import('Models/Journal').default}} props
 */
function Journal(props) {
  const { journal, onShowGrades } = props;

  const detailsPath = generatePath(ROUTES.gradeDetails, {
    journalId: journal.id,
  });

  const showGrades = useCallback(() => {
    onShowGrades(journal);
  }, [journal, onShowGrades]);

  return (
    <li className={styles.journal}>
      <div className={styles.details}>
        <JournalThumbnail journal={journal} size={72} />
        <div>
          <h3>{journal.name}</h3>
          <p>
            <pre>{journal.description}</pre>
          </p>
          <p>
            <span className={styles.badge}>{journal.group.name}</span>
            &nbsp; &#x25cf; &nbsp;
            <span>
              {formatRelative(journal.updatedAt, new Date(), {
                locale: ukLocale,
              })}
            </span>
          </p>
        </div>
      </div>

      <Link to={detailsPath}>
        <Button onClick={showGrades}>
          Переглянути оцінки <BsArrowRight size={24} />
        </Button>
      </Link>
    </li>
  );
}

export default Journal;
