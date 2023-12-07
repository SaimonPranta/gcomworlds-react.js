export const nameValidator = (value) => {
  if (!value) {
    return true;
  }
  const regExp = new RegExp(/^[A-Za-z\s]+$/);
  return regExp.test(value);
};
export const numberValidator = (value) => {
  if (!value) {
    return true;
  }
  const regExp = new RegExp(/^[0-9]+$/);
  return regExp.test(value);
};
