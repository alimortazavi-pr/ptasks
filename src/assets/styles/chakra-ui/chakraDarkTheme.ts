import { extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";
import { inputDarkTheme } from "./customInput";
import { menuDarkTheme } from "./customMenu";
import { modalDarkTheme } from "./customModal";

const chakraDarkTheme: Dict = extendTheme({
  direction: "rtl",
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    violet: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
  },
  components: {
    Input: inputDarkTheme,
    Modal: modalDarkTheme,
    Menu: menuDarkTheme,
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                transform: "scale(0.85) translateY(-24px)",
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                transform: "scale(0.85) translateY(-24px)",
              },
            label: {
              top: 0,
              right: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "#1f2937",
              pointerEvents: "none",
              color: "white",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "right top",
            },
          },
        },
      },
    },
  },
});

export default chakraDarkTheme;
