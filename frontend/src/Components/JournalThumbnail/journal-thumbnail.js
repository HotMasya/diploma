// Modules
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Models
import Journal from 'Models/Journal';

// Styles
import styles from './styles.module.scss';

/**
 * Renders an avatar for specified user.
 * If user don't have an image, acronym placeholder will be rendered.
 *
 * @param {{ journal: Journal }} props
 */
function JournalThumbnail(props) {
  const { className, size, journal } = props;

  const style = { height: size, width: size, fontSize: size / 3 };

  if (!journal.thumbnail) {
    return (
      <div className={cx(className, styles.acronym)} style={style}>
        {journal.acronym}
      </div>
    );
  }

  return (
    <LazyLoadImage
      className={cx(className, styles.avatar)}
      src={journal.thumbnail}
      style={style}
    />
  );
}

JournalThumbnail.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  user: PropTypes.instanceOf(Journal),
};

JournalThumbnail.defaultProps = {
  className: '',
  size: 32,
  user: null,
};

export default JournalThumbnail;
