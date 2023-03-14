import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseDarkStyle = definePartsStyle({
  button: {},
  list: {
    bg: "#1f2937",
    minW: "0",
    maxW: "max-content",
    alignItems: "start",
    display: "flex",
    flexDirection: "column",
    px: "0.5rem",
    borderColor: "#1f2937",
  },
  item: {
    bg: "transparent",
    _hover: {
      bg: "#4b5563",
    },
  },
  groupTitle: {},
  command: {},
  divider: {},
});

export const menuDarkTheme = defineMultiStyleConfig({
  baseStyle: baseDarkStyle,
});

const baseLightStyle = definePartsStyle({
  button: {},
  list: {
    minW: "0",
    maxW: "max-content",
    alignItems: "start",
    display: "flex",
    flexDirection: "column",
    px: "0.5rem",
  },
  groupTitle: {},
  command: {},
  divider: {},
});

export const menuLightTheme = defineMultiStyleConfig({
  baseStyle: baseLightStyle,
});
