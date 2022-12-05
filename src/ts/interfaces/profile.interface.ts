export interface IProfileState {
  user: IProfile;
}

export interface IProfile {
  _id: string;
  createdBy?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  profileImage?: string;
  emailActive: boolean;
  mobileActive: boolean;
  password: string;
  years : string[]
  deleted: boolean;
}
