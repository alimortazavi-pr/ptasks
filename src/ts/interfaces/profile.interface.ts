export interface IProfileState {
  user: IProfile;
}

export interface IProfile {
  _id: string;
  createdBy?: string;
  firstName: string;
  lastName: string;
  mobile: string;
  profileImage?: string;
  mobileActive: boolean;
  password: string;
  years: string[];
  deleted: boolean;
}

export interface IEditProfileForm {
  firstName: string;
  lastName: string;
  mobile: string;
}

export interface IValidationErrorsEditProfileForm {
  paths: string[];
  messages: {
    firstName: string;
    lastName: string;
    mobile: string;
  };
}

export interface IChangeMobileForm {
  mobile: string;
  code: string;
}

export interface IValidationErrorsChangeMobileForm {
  paths: string[];
  messages: {
    mobile: string;
    code: string;
  };
}
