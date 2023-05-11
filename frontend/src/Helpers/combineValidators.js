export function combineValidators(...validators) {
  return (value) => {
    for (const validator of validators) {
      const errorMessage = validator(value);

      if (errorMessage) {
        return errorMessage;
      }
    }
  };
}
