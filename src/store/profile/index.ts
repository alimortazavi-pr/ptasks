import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { IProfileState } from "@/ts/interfaces/profile.interface";

//Reducers
import reducers from "@/store/profile/reducers";

const initialState: IProfileState = {
  user: {
    _id: "",
    createdBy: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    profileImage: "",
    emailActive: false,
    mobileActive: false,
    password: "",
    years: [],
    deleted: false,
  },
};

export const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers,
});

export default profileReducer.reducer;
