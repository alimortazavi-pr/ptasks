import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//Types
import { IDay } from "@/ts/interfaces/task.interface";
import { theMonthProps } from "@/ts/types/task.type";

//Components
import TheNavigation from "@/components/layouts/TheNavigation";
import DaysList from "@/components/layouts/DaysList";

//Tools
import api from "@/api";

//ts
import months from "@/assets/ts/months";
import { GetServerSideProps } from "next";

export default function TheMonth({ days }: theMonthProps) {
  //Next
  const router = useRouter();

  return (
    <div>
      <TheNavigation
        title={
          months.find((month) => month.num === router.query.month)?.title ||
          "ماه ها"
        }
        isEnabledPreviousPage={true}
        previousPage={`/${router.query.year}`}
      />
      <DaysList days={days} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  let days: IDay[] = [];
  try {
    if (req.cookies.userAuthorization) {
      const transformedData = JSON.parse(req.cookies.userAuthorization);
      const page = query.page || 1;
      const response = await api.get(`/tasks/${query.year}/${query.month}`, {
        headers: {
          Authorization: `Bearer ${transformedData.token}`,
          "Accept-Encoding": "application/json",
        },
      });
      days = response.data.days;
    }
  } catch (error: any) {
    console.log(error.response?.data);
  }

  return {
    props: {
      days: days,
    },
  };
};
