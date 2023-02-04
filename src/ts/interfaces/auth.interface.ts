export interface IAuthState {
  token: null | string;
  didTryAutoLogin: boolean;
  isAuth: boolean;
}

export interface IValidationErrorsCheckMobileExist {
  paths: string[];
  messages: {
    mobile: string;
  };
}

export interface ISignUpForm {
  firstName: string;
  lastName: string;
  mobile: string;
  code: string;
}

export interface IValidationErrorsSignUpForm {
  paths: string[];
  messages: {
    firstName: string;
    lastName: string;
    mobile: string;
    code: string;
  };
}

export interface ISignInForm {
  mobile: string;
  code: string;
}

export interface IValidationErrorsSignInForm {
  paths: string[];
  messages: {
    mobile: string;
    code: string;
  };
}
