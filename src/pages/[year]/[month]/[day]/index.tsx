import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

//Types
import { theTasksProps } from "@/ts/types/task.type";
import { ITask } from "@/ts/interfaces/task.interface";

//Components
import TheNavigation from "@/components/layouts/TheNavigation";
import TasksList from "@/components/task/TasksList";

//Tools
import months from "@/assets/ts/months";
import convertToPersian from "num-to-persian";
import api from "@/api";

export default function TheDay({ tasks }: theTasksProps) {
  //Redux
  const router = useRouter();

  return (
    <div className="">
      <TheNavigation
        title={
          `${convertToPersian(router.query.day as string)}/${
            months.find(
              (month) =>
                parseInt(month.num) === parseInt(router.query.month as string)
            )?.title
          }/${convertToPersian(router.query.year as string)}` || "تسک ها"
        }
        isEnabledPreviousPage={true}
        previousPage={`/${router.query.year}/${router.query.month}`}
      />
      <TasksList tasks={tasks} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  let tasks: ITask[] = [];
  try {
    if (req.cookies.userAuthorization) {
      const transformedData = JSON.parse(req.cookies.userAuthorization);
      const page = query.page || 1;
      const response = await api.get(
        `/tasks/${query.year}/${query.month}/${query.day}`,
        {
          headers: {
            Authorization: `Bearer ${transformedData.token}`,
            "Accept-Encoding": "application/json",
          },
        }
      );
      tasks = response.data.tasks;
    }
  } catch (error: any) {
    console.log(error.response?.data);
  }

  return {
    props: {
      tasks: tasks,
    },
  };
};
