import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { ITaskState } from "@/ts/interfaces/task.interface";

//Reducers
import reducers from "@/store/task/reducers";

const initialState: ITaskState = {};

export const taskReducer = createSlice({
  name: "task",
  initialState,
  reducers,
});

export default taskReducer.reducer;
