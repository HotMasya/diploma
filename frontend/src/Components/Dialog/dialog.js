// Modules
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

// Components
import IconButton from 'Components/IconButton';

// Styles
import styles from './styles.module.scss';

const transitionDurationMs = 150;
let timeout;

const Dialog = forwardRef((props, ref) => {
  const { children, className, description, onClose, pending, title } = props;

  const [closing, setClosing] = useState(false);
  const overlayRef = useRef(null);

  const handleClose = useCallback(() => {
    setClosing(true);

    if (!isFunction(onClose)) return;

    return new Promise((resolve) => {
      timeout = setTimeout(() => {
        onClose();
        resolve();
      }, transitionDurationMs);
    });
  }, [onClose]);

  useImperativeHandle(
    ref,
    () => ({
      close: handleClose,
    }),
    [handleClose]
  );

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      handleClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  const overlayClassNames = cx(styles.overlay, {
    [styles.closing]: closing,
  });

  const dialogClassNames = cx(className, styles.dialog, {
    [styles.closing]: closing,
    [styles.pending]: pending,
  });

  return (
    <div
      className={overlayClassNames}
      onClick={handleOverlayClick}
      ref={overlayRef}
    >
      <div className={dialogClassNames}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <IconButton onClick={handleClose}>
            <IoClose size={24} />
          </IconButton>
        </div>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.buttons}>{children}</div>
      </div>
    </div>
  );
});

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.node,
  onClose: PropTypes.func,
  pending: PropTypes.bool,
  title: PropTypes.node,
};

Dialog.defaultProps = {
  children: [],
  className: '',
  description: null,
  onClose: undefined,
  pending: false,
  title: null,
};

export default Dialog;
