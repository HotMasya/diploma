// Modules
import { Link, generatePath } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';

// Components
import Button from 'Components/Button';
import JournalThumbnail from 'Components/JournalThumbnail';

// Styles
import styles from './styles.module.scss';
import { ROUTES } from 'Config/routes';
import ActionsButton from '../ActionsButton/actions-button';

/**
 * @param {{ journal: import('Models/Journal').default}} props
 */
function Journal(props) {
  const { journal, onEdit, onRemove } = props;

  const detailsPath = generatePath(ROUTES.journalDetails, {
    journalId: journal.id,
  });

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

      <div className={styles.options}>
        <ActionsButton journal={journal} onEdit={onEdit} onRemove={onRemove} />
        <Link to={detailsPath}>
          <Button>
            Перейти до журналу
            <BsArrowRight size={24} />
          </Button>
        </Link>
      </div>
    </li>
  );
}

export default Journal;
