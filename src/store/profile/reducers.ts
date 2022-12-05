import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import { IProfile, IProfileState } from "@/ts/interfaces/profile.interface";

//Tools

const reducers = {
  setProfile: (
    state: IProfileState,
    action: PayloadAction<IProfile>
  ): IProfileState => {
    // function compareNumbers(a, b) {
    //   return a - b;
    // }
    return {
      ...state,
      user: {
        ...action.payload,
        years: action.payload.years.sort((a, b) => parseInt(b) - parseInt(a)),
      },
    };
  },
  setYears: (
    state: IProfileState,
    action: PayloadAction<string[]>
  ): IProfileState => {
    return {
      ...state,
      user: { ...state.user, years: action.payload },
    };
  },
};

export default reducers;
