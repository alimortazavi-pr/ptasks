import { AppThunk } from "@/store";

//Actions of other store
import { authenticate, saveDataToLocal } from "@/store/auth/actions";

//Reducer
import { profileReducer } from "@/store/profile";

//Actions from reducer
export const { setProfile, setYears } = profileReducer.actions;

//Interfaces
import { IChangeMobileForm, IEditProfileForm } from "@/ts/interfaces/profile.interface";

//Tools
import api from "@/api";

//Actions from actions
export function getProfile(): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.get(`/profile`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setProfile(res.data.user));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function editProfile(form: IEditProfileForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.put(`/profile`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setProfile(res.data.user));
        saveDataToLocal(getState().auth.token as string, res.data.user);
      }
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

export function changeMobile(form: IChangeMobileForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.put(`/profile/change-mobile`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setProfile(res.data.user));
        await dispatch(
          authenticate({
            token: res.data.token,
          })
        );
        saveDataToLocal(res.data.token, res.data.user);
      }
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}
