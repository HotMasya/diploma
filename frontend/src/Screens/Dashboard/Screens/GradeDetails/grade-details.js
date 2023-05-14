// Modules
import { toast } from 'react-toastify';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';

// API
import API from 'API';

// Components
import Paper from 'Components/Paper';
import Table from 'Components/Table';
import JournalThumbnail from 'Components/JournalThumbnail';

// Constants
import { columns } from './columns-config';

// Config
import { ROUTES } from '../../../../Config/routes';

// Styles
import styles from './styles.module.scss';

function GradeDetails() {
  const { journalId } = useParams();
  const [journal, setJournal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const request = API.Journals.getStudentGradeDetails(journalId)
      .then(setJournal)
      .catch((err) => {
        navigate(ROUTES.grades);
        return err;
      });

    toast.promise(request, {
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
  }, [journalId, navigate]);

  const data = useMemo(() => {
    if (!journal) return [];

    const row = journal.rows[0];

    if (!row) return [];

    return journal.columns.map(({ id, title, computed }) => ({
      title,
      value: row[id]?.value || '-',
      editor: computed ? 'Автоматично' : row[id]?.editor || '-',
      note: row[id]?.note || '-',
      updatedAt: row[id]?.updatedAt,
    }));
  }, [journal]);

  if (!journal) return null;

  return (
    <Paper className={styles.container}>
      <h1>Інформація про оцінки</h1>
      <div className={styles.journal}>
        <JournalThumbnail journal={journal} size={72} />
        <div>
          <h2>{journal.name}</h2>
          <p>{journal.details}</p>
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
      <Table className={styles.table} columns={columns} data={data} preventOverflow={false} />
    </Paper>
  );
}

export default GradeDetails;
