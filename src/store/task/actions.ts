import { AppThunk } from "@/store";

//Actions of other store
import { setYears } from "../profile/actions";

//Reducer
import { taskReducer } from "@/store/task";

//Actions from reducer
export const {} = taskReducer.actions;

//Interfaces
import { ICreateAndEditTaskForm } from "@/ts/interfaces/task.interface";

//Tools
import api from "@/api";

//Actions from actions
export function getTasksOfMonth({
  year,
  month,
}: {
  year: string;
  month: string;
}): AppThunk {
  return async (dispatch, getState) => {
    try {
      const res = await api.get(`/tasks/${year}/${month}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      return res.data.days;
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

export function createTask(form: ICreateAndEditTaskForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      const res = await api.post("/tasks", form, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (res.data.hasNewYearCreated) {
        dispatch(setYears(res.data.years));
      }
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

export function editTask(
  form: ICreateAndEditTaskForm,
  taskId: string
): AppThunk {
  return async (dispatch, getState) => {
    try {
      const res = await api.put(`/tasks/${taskId}`, form, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (res.data.hasNewYearCreated) {
        dispatch(setYears(res.data.years));
      }
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

export function toggleIsDoneTask(taskId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      const res = await api.put(
        `/tasks/${taskId}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

export function deleteTask(taskId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      const res = await api.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}
