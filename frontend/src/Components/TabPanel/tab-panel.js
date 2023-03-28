// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';

// Components
import Tab from './tab';

// Styles
import styles from './styles.module.scss';

function TabPanel(props) {
  const { children, className } = props;

  return <div className={cx(className, styles.tabs)}>{children}</div>;
}

TabPanel.Tab = Tab;

TabPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TabPanel.defaultProps = {
  children: [],
  className: '',
};

export default TabPanel;
