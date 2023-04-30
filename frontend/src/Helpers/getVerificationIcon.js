// Modules
import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';

// Constants
import { GREEN, RED } from 'Constants/colors';

export const getVerificationIcon = (verified) =>
  verified ? (
    <FaCheckCircle color={GREEN._500} size={24} title="Пошта підтверджена" />
  ) : (
    <FaTimesCircle color={RED._500} size={24} title="Пошта не підтверджена" />
  );
