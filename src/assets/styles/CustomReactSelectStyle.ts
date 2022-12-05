import { GroupBase, StylesConfig } from "react-select";

const customStyle: StylesConfig<any, boolean, GroupBase<any>> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "10px 10px 2px 2px",
    borderColor: "#EAEAEA",
    minHeight: "var(--chakra-sizes-10)",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontWeight: "400",
    color: "#7d7d7d",
    fontSize: "15px",
    "@media only screen and (max-width: 1023px)": {
      fontSize: "14px",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    zIndex: 4,
  }),
  container: (provided, state) => ({
    ...provided,
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 5,
  }),
  menuList: (provided, state) => ({
    ...provided,
    zIndex: 10,
  }),
};

export default customStyle;
