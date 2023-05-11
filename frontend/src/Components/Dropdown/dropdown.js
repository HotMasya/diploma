// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';
import { cloneElement, memo, useCallback, useEffect, useRef, useState } from 'react';
import map from 'lodash/map';
import isFunction from 'lodash/isFunction';

// Components
import DropdownItem from './dropdown-item';

// Styles
import styles from './styles.module.scss';

function Dropdown(props) {
  const { className, onSelect, options, targetElement } = props;

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clickHandler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const clonedElement = cloneElement(targetElement, { onClick: clickHandler });

  const handleSelect = useCallback(
    (option) => {
      if (isFunction(onSelect)) {
        onSelect(option);
      }

      setIsOpen(false);
    },
    [onSelect]
  );

  return (
    <div className={styles.container} ref={dropdownRef}>
      {clonedElement}
      {isOpen && (
        <ul className={cx(className, styles.menu)}>
          {map(options, (option, idx) =>
            option.separator ? (
              <div className={styles.separator} key={idx} />
            ) : (
              <DropdownItem
                {...option}
                key={idx}
                onSelect={handleSelect}
              />
            )
          )}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  children: [],
  className: '',
};

export default memo(Dropdown);
