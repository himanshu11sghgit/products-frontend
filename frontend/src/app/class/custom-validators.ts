export const CustomValidators = {
    password:
      /^(?![\s])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w])([^\s]){8,}$/,
    userName: /^([a-zA-Z0-9]){4,}$/,
    phoneNumber: /^[0]?[6789]\d{9}$/,
    onlyChars: /^[a-zA-Z ]*$/,
};
  