import toastr from 'toastr';

toastr.options = {
  closeButton: true,
  newestOnTop: true,
  progressBar: true,
};

export const alertErr = (error = '') => {
  toastr.error(error?.response?.data?.message || error.message);
};

export const alertSuccess = (msg = '')=>{
  toastr.success(msg);
};
export const stringifyErrors = (errorList)=>{
  return JSON.stringify(errorList.map((e)=>e.msg));
};

export const setTokenToLocalStorage = (token) => {
  localStorage.setItem(`token${import.meta.env.VITE_REST_API_GATEWAY}`, token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(`token${import.meta.env.VITE_REST_API_GATEWAY}`);
};

export const removeTokenFromLocalStorage = () => {
  return localStorage.removeItem(`token${import.meta.env.VITE_REST_API_GATEWAY}`);
};

export const validateInput = (inputValue, pattern, errorList, errorKey, msg = '') => {
  if (!inputValue) errorList[errorKey] = `${errorKey} ${msg ? msg :'is required'}`;
  else if (!pattern.test(inputValue)) errorList[errorKey] = `${msg ? msg :`Invalid ${errorKey} format`}`;
};

export const validateInputPassword = (password, errorList) => {
  if (!password) errorList.password = 'Password is required';
  else if (password.length < 8) errorList.password = 'Password must be at least 8 characters long';
};
