import { scaleHeight, scaleWidth } from "./layout";

export const SPACING = {
  // width
  none: 0,
  wxs: scaleWidth(4),
  ws: scaleWidth(8),
  wm: scaleWidth(16),
  wl: scaleWidth(24),
  wxl: scaleWidth(40),

  // height
  hxs: scaleHeight(4),
  hs: scaleHeight(8),
  hm: scaleHeight(16),
  hl: scaleHeight(24),
  hxl: scaleHeight(40),

  //negative height
  nhxs: scaleHeight(-4),
  nhs: scaleHeight(-8),
  nhm: scaleHeight(-16),
  nhl: scaleHeight(-24),
  nhxl: scaleHeight(-40),
};
