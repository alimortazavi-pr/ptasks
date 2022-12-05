import * as yup from "yup";

export const createAndEditTask = yup.object().shape({
  title: yup.string().required("لطفا عنوان تسک را وارد کنید"),
  row: yup.string().required("لطفا ردیف تسک را وارد کنید"),
  year: yup.string().required("لطفا سال تسک را وارد کنید"),
  month: yup.string().required("لطفا ماه تسک را وارد کنید"),
  day: yup.string().required("لطفا روز تسک را وارد کنید"),
});