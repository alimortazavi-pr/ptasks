import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//Types
import { daysListProps } from "@/ts/types/task.type";

//Tools
import convertToPersian from "num-to-persian";
import months from "@/assets/ts/months";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export default function DaysList({ days }: daysListProps) {
  //Next
  const router = useRouter();

  return (
    <ul className="grid grid-cols-12 gap-3 px-3">
      {days.map((day, i) => (
        <li key={i} className="col-span-6">
          <Link
            href={`/${router.query.year}/${router.query.month}/${
              (i + 1).toString().length < 2 ? `0${i + 1}` : i + 1
            }`}
            className="rounded-3xl bg-gray-200 dark:bg-gray-800 flex flex-col justify-between px-4 py-4 h-40"
          >
            <div
              className={`w-10 h-10 bg-violet-400 dark:bg-violet-800 text-gray-800 dark:text-gray-200 rounded-xl flex items-center justify-center relative`}
            >
              {convertToPersian(
                (i + 1).toString().length < 2 ? `0${i + 1}` : i + 1
              )}
            </div>

            <div className="">
              <div className="leading-none font-semibold mb-2 text-gray-800 dark:text-gray-200">{`${convertToPersian(
                (i + 1).toString().length < 2 ? `0${i + 1}` : i + 1
              )}/${
                months.find(
                  (month) =>
                    parseInt(month.num) ===
                    parseInt(router.query.month as string)
                )?.title
              }/${convertToPersian(router.query.year as string)}`}</div>
              <div className="flex items-center justify-between">
                <div className="leading-none text-gray-600 dark:text-gray-400 text-sm">{`${convertToPersian(
                  day.isDoneTasksLength
                )}/${convertToPersian(day.tasksLength)} انجام شده`}</div>
                <CircularProgress
                  size={"30px"}
                  value={day.isDoneTasksPresent}
                  color="green.500"
                >
                  <CircularProgressLabel>
                    <span className="text-gray-800 dark:text-gray-200">{convertToPersian(day.isDoneTasksPresent)}%</span>
                  </CircularProgressLabel>
                </CircularProgress>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
