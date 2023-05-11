// Modules
import PropTypes from 'prop-types';
import cx from 'classnames';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

// Components
import IconButton from 'Components/IconButton';

// Styles
import styles from './styles.module.scss';
import { memo } from 'react';

function Paginator(props) {
  const { className, currentPage, limit, onChange, total } = props;

  const totalPages = Math.ceil(total / limit);

  if (total <= 1) return null;

  return (
    <div className={cx(className, styles.container)}>
      <span>
        Сторінка <b>{currentPage}</b> із <b>{totalPages}</b>
      </span>
      <IconButton
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        <GoChevronLeft size={24} />
      </IconButton>
      <IconButton
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        <GoChevronRight size={24} />
      </IconButton>
    </div>
  );
}

Paginator.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  total: PropTypes.number,
};

Paginator.defaultProps = {
  className: '',
  currentPage: 1,
  limit: 10,
  total: 1,
};

export default memo(Paginator);
