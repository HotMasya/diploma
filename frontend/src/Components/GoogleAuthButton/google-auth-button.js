// Modules
import { FcGoogle } from 'react-icons/fc';
import PropTypes from 'prop-types';

// Components
import Button from 'Components/Button';

// Config
import { useLoginWithGoogle } from 'Hooks/useLoginWithGoogle';

function GoogleAuthButton(props) {
  const { className, disabled } = props;

  const loginWithGoogle = useLoginWithGoogle();

  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={loginWithGoogle}
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
