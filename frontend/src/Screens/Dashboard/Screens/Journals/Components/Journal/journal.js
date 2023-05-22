// Modules
import { Link, generatePath } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';
import cx from 'classnames';

// Components
import ActionsButton from '../ActionsButton';
import Button from 'Components/Button';
import JournalThumbnail from 'Components/JournalThumbnail';

// Context
import { useUserContext } from 'Context/UserContext';

// Config
import { ROUTES } from 'Config/routes';

// Styles
import styles from './styles.module.scss';

/**
 * @param {{ journal: import('Models/Journal').default}} props
 */
function Journal(props) {
  const { editable, journal, onEdit, onRemove } = props;

  const [user] = useUserContext();

  const detailsPath = generatePath(ROUTES.journalDetails, {
    journalId: journal.id,
  });

  const isOwner = user.id === journal.teacher.user.id;

  return (
    <li className={styles.journal}>
      <div className={styles.details}>
        <JournalThumbnail journal={journal} size={72} />
        <div>
          <h3>{journal.name}&nbsp;</h3>
          <p>
            <pre>{journal.description}</pre>
          </p>
          <p className={styles.meta}>
            <span className={cx(styles.badge, styles.group)}>{journal.group.name}</span>
            &nbsp; &#x25cf; &nbsp;
            <span>
              {formatRelative(journal.updatedAt, new Date(), {
                locale: ukLocale,
              })}
            </span>
            {!isOwner && (
              <>
                &nbsp; &#x25cf; &nbsp;
                <span className={styles.badge} title={journal.teacher.user.fullName}>
                  Власник: {journal.teacher.user.fullName}asdasd
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className={styles.options}>
        {editable && isOwner ? (
          <ActionsButton
            journal={journal}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ) : <span />}

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
