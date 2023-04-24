// Modules
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import cx from 'classnames';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';

// Components
import Input from 'Components/Input';

// Styles
import styles from './styles.module.scss';
import IconButton from 'Components/IconButton/icon-button';

function MultiValue(props) {
  const { formatMultiValue, option } = props;

  return <div className={styles.multiValue}>{formatMultiValue(option)}</div>;
}

function Option(props) {
  const { formatOption, option, onSelect } = props;

  const handleSelect = () => {
    onSelect(option);
  };

  return (
    <li className={styles.option} onClick={handleSelect}>
      {formatOption(option)}
    </li>
  );
}

const transitionDurationMs = 150;

function Select(props) {
  const {
    className,
    disabled,
    formatMultiValue,
    formatOption,
    hasError,
    isSearchable,
    onChange,
    onSearch,
    options,
    pending,
    placeholder,
    title,
    value,
  } = props;

  const [isOpen, setOpen] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const [search, setSearch] = useState('');

  const componentRef = useRef(null);
  const overlayRef = useRef(null);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) => {
        if (isArray(value)) {
          return !value.includes(option);
        }

        return value !== option;
      }),
    [options, value]
  );

  const handleClose = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setSearch('');

      if (isFunction(onSearch)) {
        onSearch('');
      }
    }, transitionDurationMs);
  }, [onSearch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        handleClose();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  const clickHandler = () => {
    setOpen((prev) => !prev);
  };

  const searchHandler = ({ target }) => {
    setSearch(target.value);
    if (isFunction(onSearch)) {
      onSearch(target.value);
    }
  };

  const handleDelete = useCallback(
    (option) => {
      if (!isFunction(onChange)) return;

      if (!isArray(value)) {
        onChange(null);
        return;
      }

      const filteredOptions = value.filter(
        ({ value }) => value !== option.value
      );

      onChange(filteredOptions);
    },
    [onChange, value]
  );

  const handleSelect = useCallback(
    (option) => {
      if (!isFunction(onChange)) return;

      if (isArray(value)) {
        onChange([...value, option]);
        return;
      }

      onChange(option);
      handleClose();
    },
    [handleClose, onChange, value]
  );

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      handleClose();
    }
  };

  let valueContent;

  switch (true) {
    case isEmpty(value):
      valueContent = placeholder;
      break;
    case isArray(value):
      valueContent = map(value, (item) => (
        <MultiValue
          formatMultiValue={formatMultiValue}
          key={item.value}
          option={item}
          onDelete={handleDelete}
        />
      ));
      break;

    default:
      valueContent = value.label;
      break;
  }

  let optionsContent;

  switch (true) {
    case pending:
      optionsContent = <li className={styles.empty}>Завантаження опцій...</li>;
      break;

    case isEmpty(filteredOptions):
      optionsContent = <li className={styles.empty}>Немає доступних опцій</li>;
      break;

    default:
      optionsContent = map(filteredOptions, (option) => (
        <Option
          formatOption={formatOption}
          key={option.value}
          onSelect={handleSelect}
          option={option}
        />
      ));
      break;
  }

  const overlayClassNames = cx(styles.overlay, {
    [styles.closing]: isClosing,
  });

  const selectClassNames = cx(styles.select, {
    [styles.closing]: isClosing,
  });

  return (
    <div className={cx(className, styles.container)} ref={componentRef}>
      <button
        className={cx(styles.valueContainer, {
          [styles.placeholder]: isEmpty(value),
          [styles.error]: hasError,
        })}
        disabled={disabled}
        onClick={clickHandler}
        type="button"
      >
        {valueContent}
      </button>

      <FiChevronDown size={24} />

      {isOpen && (
        <div
          className={overlayClassNames}
          onClick={handleOverlayClick}
          ref={overlayRef}
        >
          <div className={selectClassNames}>
            <div className={styles.header}>
              <h3>{title}</h3>
              <IconButton onClick={handleClose}>
                <IoClose size={24} />
              </IconButton>
            </div>
            {isSearchable && (
              <div className={styles.wrapper}>
                <Input
                  onChange={searchHandler}
                  placeholder="Пошук..."
                  type="text"
                  value={search}
                />
              </div>
            )}

            {!isEmpty(value) && (
              <ul className={styles.selected}>
                <li className={styles.sectionTitle}>Вибрані опції</li>
                {isArray(value) ? (
                  map(value, (option) => (
                    <Option
                      formatOption={formatOption}
                      key={option.value}
                      onSelect={handleDelete}
                      option={option}
                    />
                  ))
                ) : (
                  <Option
                    formatOption={formatOption}
                    key={value.value}
                    option={value}
                    onSelect={handleDelete}
                  />
                )}
              </ul>
            )}

            <ul>
              <li className={styles.sectionTitle}>Доступні опції</li>
              {optionsContent}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  formatMultiValue: PropTypes.func,
  formatOption: PropTypes.func,
  hasError: PropTypes.bool,
  isSearchable: PropTypes.bool,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  pending: PropTypes.bool,
  placeholder: PropTypes.string,
  title: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Select.defaultProps = {
  className: '',
  disabled: false,
  formatMultiValue: (option) => option.label,
  formatOption: (option) => option.label,
  hasError: false,
  isSearchable: false,
  onChange: undefined,
  onSearch: undefined,
  options: [],
  pending: false,
  placeholder: '',
  title: '',
  value: null,
};

export default Select;
