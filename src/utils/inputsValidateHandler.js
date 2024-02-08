import { emailRegex } from "../costants/regExps";

export const validatePassword = (value) => {
  return value.length > 7;
};

export const validateEmail = (value) => {
  return emailRegex.test(value);
};

export const validateText = (value) => {
  return value.length > 0;
};

export const validateCode = (value) => {
  return value.length === 7;
};
