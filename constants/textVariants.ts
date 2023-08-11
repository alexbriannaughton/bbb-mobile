import { scaleFont, scaleHeight } from "./layout";

export const TEXT_VARIANTS = {
  defaults: {
    // fontSize: scaleFont(14),
    // lineHeight: scaleHeight(20),
    // color: "body",
  },
  header: {
    color: "textPrimary",
    fontSize: scaleFont(34),
    lineHeight: scaleHeight(42.5),
  },
  subheader: {
    color: "body",
    fontSize: scaleFont(28),
    lineHeight: scaleHeight(40),
  },
  body: {
    color: "textPrimary",
    fontSize: scaleFont(16),
    lineHeight: scaleHeight(24),
  },
  error: {
    color: "error",
    fontSize: scaleFont(14),
    lineHeight: scaleHeight(20),
  },
};
