import {
  BackgroundColorProps,
  BorderProps,
  createBox,
  SpacingProps,
} from "@shopify/restyle";
import { StyleTheme } from "../../constants/theme";

export type RestyleProps = SpacingProps<StyleTheme> &
  BorderProps<StyleTheme> &
  BackgroundColorProps<StyleTheme>;

export type SViewProps = RestyleProps;

const SView = createBox<StyleTheme>();

export { SView };
