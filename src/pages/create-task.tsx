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

//Types
import {
  ICreateAndEditTaskForm,
  IValidationErrorsCreateAndEditTaskForm,
} from "@/ts/interfaces/task.interface";

//Redux
import { createTask } from "@/store/task/actions";
import { useAppDispatch } from "@/store/hooks";

//Components
import TheNavigation from "@/components/layouts/TheNavigation";
import Select from "react-select";

//Tools
import { toast } from "react-toastify";
import convertAPToEnglish from "ap-to-english";
import convertToPersian from "num-to-persian";
import moment from "jalali-moment";

//Validators
import { createAndEditTask } from "@/validators/taskValidator";

//Styles
import CustomReactSelectStyle from "@/assets/styles/CustomReactSelectStyle";

export default function CreateTask() {
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
    { value: "01", label: "فروردین" },
    { value: "02", label: "اردیبهشت" },
    { value: "03", label: "خرداد" },
    { value: "04", label: "تیر" },
    { value: "05", label: "مرداد" },
    { value: "06", label: "شهریور" },
    { value: "07", label: "مهر" },
    { value: "08", label: "آبان" },
    { value: "09", label: "آذر" },
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
            createTask({
              ...form,
              year: convertAPToEnglish(form.year),
              month: convertAPToEnglish(form.month),
              day: convertAPToEnglish(form.day),
              date: calculatingDate,
            })
          );
          toast.success("تسک باموفقیت ایجاد شد", {
            position: toast.POSITION.TOP_CENTER,
          });
          setIsLoading(false);
          router.push(
            `/${convertAPToEnglish(form.year)}/${
              convertAPToEnglish(form.month).length < 2
                ? "0" + convertAPToEnglish(form.month)
                : convertAPToEnglish(form.month)
            }/${
              convertAPToEnglish(form.day).length < 2
                ? "0" + convertAPToEnglish(form.day)
                : convertAPToEnglish(form.day)
            }`
          );
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
      <TheNavigation title="ایجاد تسک" isEnabledPreviousPage={true} />
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
            ایجاد تسک
          </Button>
        </div>
      </form>
    </div>
  );
}
