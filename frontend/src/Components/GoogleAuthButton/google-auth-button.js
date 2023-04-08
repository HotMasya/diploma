// Modules
import { useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import PropTypes from 'prop-types';

// Components
import Button from 'Components/Button';

// Config
import { GOOGLE_OAUTH_URL } from 'Config/routes';

function GoogleAuthButton(props) {
  const { className, disabled } = props;

  const handleClick = useCallback(() => {
    window.open(GOOGLE_OAUTH_URL, '_self');
  }, []);

  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={handleClick}
      type="button"
      variant="secondary"
    >
      <FcGoogle size="24px" /> Авторизуватись через Google
    </Button>
  );
}

GoogleAuthButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

GoogleAuthButton.defaultProps = {
  className: '',
  disabled: false,
};

export default GoogleAuthButton;
