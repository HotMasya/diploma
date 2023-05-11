// Modules
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Models
import User from 'Models/User';

// Styles
import styles from './styles.module.scss';

/**
 * Renders an avatar for specified user.
 * If user don't have an image, acronym placeholder will be rendered.
 *
 * @param {{ user: User }} props
 */
function Avatar(props) {
  const { className, size, user } = props;

  const style = { height: size, width: size, fontSize: size / 2.5 };

  if (!user.avatarUrl) {
    return (
      <div className={cx(className, styles.acronym)} style={style}>
        {user.acronym}
      </div>
    );
  }

  return (
    <LazyLoadImage
      className={cx(className, styles.avatar)}
      src={user.avatarUrl}
      style={style}
    />
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  user: PropTypes.instanceOf(User),
};

Avatar.defaultProps = {
  className: '',
  size: 32,
  user: null,
};

export default Avatar;
