import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";

//Types
import {
  ICreateAndEditTaskForm,
  ITask,
  IValidationErrorsCreateAndEditTaskForm,
} from "@/ts/interfaces/task.interface";
import { editTaskProps } from "@/ts/types/task.type";

//Redux
import { createTask, editTask } from "@/store/task/actions";
import { useAppDispatch } from "@/store/hooks";

//Components
import TheNavigation from "@/components/layouts/TheNavigation";
import Select from "react-select";

//Tools
import { toast } from "react-toastify";
import convertAPToEnglish from "ap-to-english";
import convertToPersian from "num-to-persian";
import moment from "jalali-moment";
import api from "@/api";

//Validators
import { createAndEditTask } from "@/validators/taskValidator";

//Styles
import CustomReactSelectStyle from "@/assets/styles/CustomReactSelectStyle";

export default function EditTask({ task }: editTaskProps) {
  //Redux
  const dispatch = useAppDispatch();

  //Next
  const router = useRouter();

  //States
  const [form, setForm] = useState<ICreateAndEditTaskForm>({
    title: "",
    description: "",
    from: "",
    to: "",
    row: "",
    year: "",
    month: "",
    day: "",
    date: "",
  });
  const [yearsOptions, setYearsOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [monthsOptions, setMonthsOptions] = useState<
    { value: string; label: string }[]
  >([
    { value: "1", label: "فروردین" },
    { value: "2", label: "اردیبهشت" },
    { value: "3", label: "خرداد" },
    { value: "4", label: "تیر" },
    { value: "5", label: "مرداد" },
    { value: "6", label: "شهریور" },
    { value: "7", label: "مهر" },
    { value: "8", label: "آبان" },
    { value: "9", label: "آذر" },
    { value: "10", label: "دی" },
    { value: "11", label: "بهمن" },
    { value: "12", label: "اسفند" },
  ]);
  const [daysOptions, setDaysOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [errors, setErrors] = useState<IValidationErrorsCreateAndEditTaskForm>({
    paths: [],
    messages: {
      title: "",
      row: "",
      year: "",
      month: "",
      day: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Effect
  useEffect(() => {
    let years: { value: string; label: string }[] = [];
    for (
      let i = parseInt(
        convertAPToEnglish(new Date().toLocaleDateString("fa-IR").split("/")[0])
      );
      i >= 1300;
      i--
    ) {
      years.push({
        value: convertToPersian(i),
        label: convertToPersian(i),
      });
    }
    setYearsOptions(years);
  }, []);

  useEffect(() => {
    setForm({ ...task });
    if (task.month) {
      daysCalculator(task.month);
    }
  }, [task]);

  //Functions
  function inputHandler(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function daysCalculator(month: string) {
    let daysLength: number = 31;
    if (parseInt(month) > 6) {
      daysLength = 30;
    }
    let days: { value: string; label: string }[] = [];
    for (let i = 1; i <= daysLength; i++) {
      days.push({
        value: convertToPersian(i),
        label: convertToPersian(i),
      });
    }
    setDaysOptions(days);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErrors({
      paths: [],
      messages: {
        title: "",
        row: "",
        year: "",
        month: "",
        day: "",
      },
    });
    setIsLoading(true);
    createAndEditTask
      .validate(
        {
          ...form,
          year: convertAPToEnglish(form.year),
          month: convertAPToEnglish(form.month),
          day: convertAPToEnglish(form.day),
        },
        { abortEarly: false }
      )
      .then(async () => {
        try {
          const calculatingDate = moment(
            `${convertAPToEnglish(form.year)}/${convertAPToEnglish(
              form.month
            )}/${convertAPToEnglish(form.day)}`,
            "jYYYY/jMM/jDD"
          ).format();
          await dispatch(
            editTask(
              {
                ...form,
                year: convertAPToEnglish(form.year),
                month: convertAPToEnglish(form.month),
                day: convertAPToEnglish(form.day),
                date: calculatingDate,
              },
              router.query.taskId as string
            )
          );
          toast.success("تسک باموفقیت ویرایش شد", {
            position: toast.POSITION.TOP_CENTER,
          });
          router.push(`/${router.query.year}/${router.query.month}/${router.query.day}`)
          setIsLoading(false);
        } catch (err: any) {
          toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        let errorsArray: IValidationErrorsCreateAndEditTaskForm = {
          paths: [],
          messages: {
            title: "",
            row: "",
            year: "",
            month: "",
            day: "",
          },
        };
        err.inner.forEach((error: any) => {
          errorsArray = {
            paths: [...errorsArray.paths, error.path],
            messages: { ...errorsArray.messages, [error.path]: error.message },
          };
        });
        setErrors(errorsArray);
        setIsLoading(false);
      });
  }

  return (
    <div>
      <TheNavigation title="ویرایش تسک" isEnabledPreviousPage={true} />
      <form
        onSubmit={submit}
        className="px-3 grid grid-cols-12 gap-x-2 gap-y-5 bg-white mx-2 p-5 rounded-2xl"
      >
        <FormControl
          isInvalid={errors.paths.includes("title")}
          variant={"floating"}
          className="col-span-12"
        >
          <Input
            focusBorderColor="purple.400"
            placeholder=" "
            type="text"
            value={form.title}
            onChange={inputHandler}
            name="title"
          />
          <FormLabel>عنوان</FormLabel>
          <FormErrorMessage>
            {errors.paths.includes("title") ? errors.messages.title : ""}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={errors.paths.includes("year")}
          className="col-span-4"
        >
          <Select
            options={yearsOptions}
            onChange={(val) => setForm({ ...form, year: val.value })}
            placeholder="سال"
            styles={CustomReactSelectStyle}
            value={
              form.year
                ? {
                    value: form.year,
                    label: form.year,
                  }
                : ""
            }
          />
          <FormErrorMessage>
            {errors.paths.includes("year") ? errors.messages.year : ""}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={errors.paths.includes("month")}
          className="col-span-4"
        >
          <Select
            options={monthsOptions}
            onChange={(val) => {
              setForm({ ...form, month: val.value });
              daysCalculator(val.value);
            }}
            placeholder="ماه"
            styles={CustomReactSelectStyle}
            value={
              form.month
                ? {
                    ...monthsOptions.find(
                      (month) => month.value === form.month
                    ),
                  }
                : ""
            }
          />
          <FormErrorMessage>
            {errors.paths.includes("month") ? errors.messages.month : ""}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={errors.paths.includes("day")}
          className="col-span-4"
        >
          <Select
            isDisabled={!form.month}
            options={daysOptions}
            onChange={(val) => setForm({ ...form, day: val.value })}
            placeholder="روز"
            styles={CustomReactSelectStyle}
            value={
              form.day
                ? {
                    value: form.day,
                    label: form.day,
                  }
                : ""
            }
          />
          <FormErrorMessage>
            {errors.paths.includes("day") ? errors.messages.day : ""}
          </FormErrorMessage>
        </FormControl>
        <FormControl variant={"floating"} className="col-span-6">
          <Input
            focusBorderColor="purple.400"
            placeholder=" "
            type="time"
            value={form.from}
            onChange={inputHandler}
            name="from"
          />
          <FormLabel>از ساعت</FormLabel>
        </FormControl>
        <FormControl variant={"floating"} className="col-span-6">
          <Input
            focusBorderColor="purple.400"
            placeholder=" "
            type="time"
            value={form.to}
            onChange={inputHandler}
            name="to"
          />
          <FormLabel>تا ساعت</FormLabel>
        </FormControl>
        <FormControl
          isInvalid={errors.paths.includes("row")}
          variant={"floating"}
          className="col-span-12"
        >
          <Input
            focusBorderColor="purple.400"
            placeholder=" "
            type="number"
            value={form.row}
            onChange={inputHandler}
            name="row"
          />
          <FormLabel>ردیف</FormLabel>
          <FormErrorMessage>
            {errors.paths.includes("row") ? errors.messages.row : ""}
          </FormErrorMessage>
        </FormControl>
        <FormControl variant={"floating"} className="col-span-12">
          <Textarea
            focusBorderColor="purple.400"
            placeholder=" "
            value={form.description}
            onChange={inputHandler}
            name="description"
          />
          <FormLabel>توضیحات</FormLabel>
        </FormControl>
        <div className="col-span-12 flex flex-col-reverse items-center justify-center lg:flex-row">
          <Button
            colorScheme="purple"
            variant={"outline"}
            className="w-full"
            type="submit"
            isLoading={isLoading}
          >
            ویرایش تسک
          </Button>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  let task: ITask = {
    _id: "",
    user: "",
    title: "",
    description: "",
    isDone: false,
    from: "",
    to: "",
    row: 1,
    year: "",
    month: "",
    day: "",
    date: new Date(),
    deleted: false,
  };
  try {
    if (req.cookies.userAuthorization) {
      const transformedData = JSON.parse(req.cookies.userAuthorization);
      const response = await api.get(`/tasks/${query.taskId}`, {
        headers: {
          Authorization: `Bearer ${transformedData.token}`,
        },
      });
      task = response.data.task;
    }
  } catch (error: any) {
    console.log(error.response?.data);
  }

  return {
    props: {
      task: task,
    },
  };
};