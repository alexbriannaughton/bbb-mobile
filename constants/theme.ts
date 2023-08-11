// https://shopify.github.io/restyle/
import { createTheme } from "@shopify/restyle";
import { PALETTE } from "./palette";
import { SPACING } from "./spacing";
import { TEXT_VARIANTS } from "./textVariants";

const theme = createTheme({
  colors: PALETTE,
  spacing: SPACING,
  textVariants: TEXT_VARIANTS,
  breakpoints: {}, //we use automatic scaling, so we don't need breakpoints
});

export type StyleTheme = typeof theme;
export default theme;
