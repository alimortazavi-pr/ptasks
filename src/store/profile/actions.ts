import { AppThunk } from "@/store";

//Reducer
import { profileReducer } from "@/store/profile";

//Actions from reducer
export const { setProfile,setYears } = profileReducer.actions;

//Interfaces
import {} from "@/ts/interfaces/profile.interface";

//Tools
import api from "@/api";

//Actions from actions
