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
import { editTask } from "@/store/task/actions";
import { darkModeSelector } from "@/store/layout/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

//Components
import TheNavigation from "@/components/layouts/TheNavigation";

//Tools
import { toast } from "react-toastify";
import convertAPToEnglish from "ap-to-english";
import moment from "jalali-moment";
import api from "@/api";
import DatePicker from "react-multi-date-picker";
import persianLocale from "react-date-object/locales/persian_fa";
import persianCalendar from "react-date-object/calendars/persian";

//Validators
import { createAndEditTask } from "@/validators/taskValidator";

export default function EditTask({ task }: editTaskProps) {
  //Redux
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(darkModeSelector);

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
  const [datePickerValue, setDatePickerValue] = useState<number>(
    new Date().getTime()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Effects
  useEffect(() => {
    setForm({ ...task });
    setDatePickerValue(new Date(parseInt(task.date)).getTime());
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

  function setDateFunc(date: any) {
    const convertDate = moment(parseInt(JSON.stringify(date)))
      .format("jYYYY/jMM/jDD")
      .split("/");
    setForm({
      ...form,
      year: convertDate[0],
      month: convertDate[1],
      day: convertDate[2],
      date: JSON.stringify(date),
    });
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
          await dispatch(
            editTask(
              {
                ...form,
                year: convertAPToEnglish(form.year),
                month: convertAPToEnglish(form.month),
                day: convertAPToEnglish(form.day),
                date: convertAPToEnglish(form.date),
              },
              router.query.taskId as string
            )
          );
          toast.success("تسک باموفقیت ویرایش شد", {
            position: toast.POSITION.TOP_CENTER,
          });
          router.push(
            `/${router.query.year}/${router.query.month}/${router.query.day}`
          );
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
        className="px-3 grid grid-cols-12 gap-x-2 gap-y-5 bg-white dark:bg-gray-800 mx-2 p-5 rounded-2xl"
      >
        <FormControl
          isInvalid={errors.paths.includes("title")}
          variant={"floating"}
          className="col-span-12"
        >
          <Input
            focusBorderColor="violet.400"
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
          className="col-span-12 lg:col-span-4"
        >
          <DatePicker
            value={datePickerValue}
            locale={persianLocale}
            calendar={persianCalendar}
            onChange={setDateFunc}
            format={"YYYY/MM/DD"}
            containerClassName="w-full outline-none"
            inputClass="w-full h-[2.5rem] rounded-[0.375rem] border border-[inherit] px-[1rem] dark:bg-transparent dark:text-gray-200 placeholder:dark:text-white outline-none"
            placeholder="تاریخ"
          />
          <FormErrorMessage>
            {errors.paths.includes("year") ? errors.messages.year : ""}
          </FormErrorMessage>
        </FormControl>
        <FormControl variant={"floating"} className="col-span-6 lg:col-span-4">
          <Input
            focusBorderColor="violet.400"
            placeholder=" "
            type="time"
            value={form.from}
            onChange={inputHandler}
            name="from"
          />
          <FormLabel>از ساعت</FormLabel>
        </FormControl>
        <FormControl variant={"floating"} className="col-span-6 lg:col-span-4">
          <Input
            focusBorderColor="violet.400"
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
            focusBorderColor="violet.400"
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
            focusBorderColor="violet.400"
            placeholder=" "
            value={form.description}
            onChange={inputHandler}
            name="description"
            color={isDarkMode ? "white" : ""}
          />
          <FormLabel>توضیحات</FormLabel>
        </FormControl>
        <div className="col-span-12 flex flex-col-reverse items-center justify-center lg:flex-row">
          <Button
            colorScheme="violet"
            variant={isDarkMode ? "solid" : "outline"}
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
    date: "",
    deleted: false,
  };
  try {
    if (req.cookies.userAuthorization) {
      const transformedData = JSON.parse(req.cookies.userAuthorization);
      const response = await api.get(`/tasks/${query.taskId}`, {
        headers: {
          Authorization: `Bearer ${transformedData.token}`,
          "Accept-Encoding": "application/json",
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
