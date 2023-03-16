import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Switch } from "@chakra-ui/react";

//Types
import { tasksListProps } from "@/ts/types/task.type";
import { ITask } from "@/ts/interfaces/task.interface";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { toggleIsDoneTask } from "@/store/task/actions";

//Components
import DeleteTask from "./DeleteTask";

//Tools
import convertToPersian from "num-to-persian";
import { toast } from "react-toastify";

export default function TasksList({ tasks: tasksProps }: tasksListProps) {
  //Redux
  const dispatch = useAppDispatch();

  //Next
  const router = useRouter();

  //States
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Effects
  useEffect(() => {
    setTasks(tasksProps);
  }, [tasksProps]);

  //Functions
  async function toggleIsDoneTaskFunc(taskId: string) {
    setIsLoading(true);
    try {
      await dispatch(toggleIsDoneTask(taskId));
      setTasks([
        ...tasks.map((task) =>
          task._id === taskId ? { ...task, isDone: !task.isDone } : task
        ),
      ]);
      setIsLoading(false);
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  return (
    <ul className="grid grid-cols-12 gap-3 px-3">
      {tasks.map((task) => (
        <li key={task._id} className="col-span-12">
          <span
            className={`rounded-2xl bg-white dark:bg-gray-800 border-2 duration-700 ${
              task.isDone
                ? "border-teal-100 dark:border-teal-900"
                : "border-rose-100 dark:border-rose-900"
            } px-4 py-4 flex flex-col`}
          >
            <div className="flex items-center justify-between">
              <Link
                href={`/${router.query.year}/${router.query.month}/${router.query.day}/${task._id}`}
                className="flex items-center w-max text-gray-800 dark:text-gray-200"
              >
                <span
                  className={`w-10 h-10 ${
                    task.isDone
                      ? "bg-teal-400 dark:bg-teal-600"
                      : "bg-rose-400 dark:bg-rose-600"
                  } rounded-xl flex items-center justify-center duration-700`}
                >
                  {convertToPersian(
                    task.row.toString().length < 2 ? `0${task.row}` : task.row
                  )}
                </span>
                <span className="font-semibold text-xl mr-2 max-w-[120px] md:max-w-[200px] truncate">
                  {task.title}
                </span>
              </Link>
              <div className="flex items-center">
                <DeleteTask task={task} tasks={tasks} setTasks={setTasks} />
                <Switch
                  onChange={() => toggleIsDoneTaskFunc(task._id)}
                  id="is-done"
                  isChecked={task.isDone}
                  colorScheme="teal"
                  disabled={isLoading}
                />
              </div>
            </div>
            {task.from || task.to ? (
              <div className="flex justify-around items-center mt-6">
                {task.from ? (
                  <span className="leading-none text-gray-600 dark:text-gray-400">
                    از ساعت : {convertToPersian(task.from)}
                  </span>
                ) : null}
                {task.to ? (
                  <span className="leading-none text-gray-600 dark:text-gray-400">
                    تا ساعت : {convertToPersian(task.to)}
                  </span>
                ) : null}
              </div>
            ) : null}

            {task.description ? (
              <div>
                <hr className="my-3 border-gray-100" />
                <p className="text-gray-600 dark:text-gray-400 m-0 leading-none">
                  {task.description}
                </p>
              </div>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
