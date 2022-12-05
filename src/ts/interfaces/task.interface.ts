export interface ITaskState {}

export interface ITask {
  _id: string;
  user: string;
  title: string;
  description: string;
  isDone: boolean;
  from: string;
  to: string;
  row: number;
  year: string;
  month: string;
  day: string;
  date: Date;
  deleted: boolean;
}

export interface ICreateAndEditTaskForm {
  title: string;
  description: string;
  isDone?: boolean;
  from: string;
  to: string;
  row: number | string;
  year: string;
  month: string;
  day: string;
  date: Date | string;
}

export interface IValidationErrorsCreateAndEditTaskForm {
  paths: string[];
  messages: {
    title: string;
    row: string;
    year: string;
    month: string;
    day: string;
  };
}

export interface IDay {
  tasks: ITask[];
  tasksLength: number;
  isDoneTasksLength: number;
  isDoneTasksPresent: number;
}
