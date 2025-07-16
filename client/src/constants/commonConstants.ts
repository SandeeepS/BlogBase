export const MOBILE_NUM_REGEX = /^[0-9]{10}$/;
export const PIN_CODE_REGEX = /^[0-9]{6}$/;

 export const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%\\^&*])(?=.{5,})"
);
export const gmailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@gmail\\.com$");