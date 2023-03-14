import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

//Reducers
import authReducer from "@/store/auth";
import taskReducer from "@/store/task";
import profileReducer from "@/store/profile";
import layoutReducer from "@/store/layout";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      task: taskReducer,
      profile: profileReducer,
      layout: layoutReducer,
    },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
