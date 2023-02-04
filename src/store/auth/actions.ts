import { AppThunk } from "@/store";

//Actions of other store
import { setProfile } from "@/store/profile/actions";

//Reducer
import { authReducer } from "@/store/auth";

//Actions from reducer
export const { authenticate, setDidTryAutoLogin, logOut } = authReducer.actions;

//Interfaces
import { ISignInForm, ISignUpForm } from "@/ts/interfaces/auth.interface";

//Tools
import api from "@/api";
import Cookies from "js-cookie";

//Actions from actions
export function autoLogin(token: string): AppThunk {
  return async (dispatch) => {
    try {
      const res = await api.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        authenticate({
          token: token,
        })
      );
      dispatch(setProfile(res.data.user));
    } catch (err: any) {
      if (
        err.response?.status === 403 ||
        err.response?.status === 401 ||
        err.response?.data?.message === "invalid token"
      ) {
        dispatch(logOut());
      } else {
        console.log(err);
      }
    }
  };
}

export function checkMobileExist(mobile: string): AppThunk {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/check-mobile-exist", { mobile });
      return res.data.isMustRegister;
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

export function requestNewCode(mobile: string): AppThunk {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/request-code", { mobile });
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

export function signUp(form: ISignUpForm): AppThunk {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/register", form);
      dispatch(
        authenticate({
          token: res.data.token,
        })
      );
      dispatch(setProfile(res.data.user));
      saveDataToLocal(res.data.token, res.data.user);
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

export function signIn(form: ISignInForm): AppThunk {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/login", form);
      dispatch(
        authenticate({
          user: res.data.user,
          token: res.data.token,
        })
      );
      dispatch(setProfile(res.data.user));
      saveDataToLocal(res.data.token, res.data.user);
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

//Functions
export function saveDataToLocal(token: string, user: object) {
  Cookies.set(
    "userAuthorization",
    JSON.stringify({
      token: token,
      user: user,
    })
  );
}
