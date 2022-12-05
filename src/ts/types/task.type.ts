import { IDay, ITask } from "@/ts/interfaces/task.interface";
import { Dispatch, SetStateAction } from "react";

export type daysListProps = {
  days: IDay[];
};

export type theMonthProps = {
  days: IDay[];
};

export type tasksListProps = {
  tasks: ITask[];
};

export type theTasksProps = {
  tasks: ITask[];
};

export type editTaskProps = {
  task: ITask;
};

export type deleteTaskProps = {
  task: ITask;
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
};
