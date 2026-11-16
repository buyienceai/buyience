import { defineTheme } from "c15t/next";

/** Align c15t banner/dialog with Buyience brand violet. */
export const buyienceConsentTheme = defineTheme({
  colors: {
    primary: "#6E2CF4",
    primaryHover: "#5B21D6",
    textOnPrimary: "#ffffff",
  },
  radius: {
    lg: "12px",
  },
  consentActions: {
    primary: { variant: "primary", mode: "filled" },
    reject: { variant: "neutral", mode: "stroke" },
    customize: { variant: "neutral", mode: "stroke" },
  },
});
