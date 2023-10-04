import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigModule from "./tailwind.config";

const tailwindConfig = resolveConfig(tailwindConfigModule);
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: tailwindConfig.theme.colors.primary,
        },
        secondary: {
          main: tailwindConfig.theme.colors.secondary,
        },
        text: {
          primary: tailwindConfig.theme.colors.textPrimary,
          secondary: tailwindConfig.theme.colors.textSecondary,
        },
      },
    },
  },

  typography: {
    fontFamily: tailwindConfig.theme.fontFamily.inter,
    h6: {
      color: {
        color: tailwindConfig.theme.colors.textPrimary,
        fontSize: "24px",
        lineHeight: "32px",
        fontWeight: 600,
      },
    },
    body1: {
      color: tailwindConfig.theme.colors.textPrimary,
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
    },
    body2: {
      color: tailwindConfig.theme.colors.textSecondary,
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        color: tailwindConfig.theme.colors.textPrimary,
        borderRadius: "8px",
      },
    },
  },
});

export default theme;
