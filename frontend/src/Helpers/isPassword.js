// Modules
import size from 'lodash/size'

const passwordConfig = {
  minLength: 8,
  minimumSpecials: 1,
  minimumCapitals: 1,
  minimumDigits: 1,
};

const defaultLengthMessage = 'Пароль занадто короткий.';
const defaultFormatMessage = `Пароль має містити мінімум: ${passwordConfig.minimumSpecials} спец. символ, ${passwordConfig.minimumCapitals} велику літеру, ${passwordConfig.minimumDigits} цифру.`;

export function isPassword(
  lengthMessage = defaultLengthMessage,
  formatMessage = defaultFormatMessage
) {
  return (value) => {
    if (size(value) < passwordConfig.minLength) {
      return lengthMessage;
    }

    const hasDigits = (value.match(/\d/g) || []).length >= passwordConfig.minimumDigits;
    const hasCaps = (value.match(/[A-Z]/g) || []).length >= passwordConfig.minimumCapitals;
    const hasSpecials = (value.match(/[^a-zA-Z1-9]/g) || []).length >= passwordConfig.minimumSpecials;

    if (!hasDigits || !hasCaps || !hasSpecials) {
      return formatMessage;
    }

    return '';
  };
}
