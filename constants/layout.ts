import { Dimensions, PixelRatio } from "react-native";

const { height, width } = Dimensions.get("window");

// paste your mockup sizes (ie. size of entire figma screen)
const MOCKUP_WIDTH = 375;
const MOCKUP_HEIGHT = 812;

export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;

/**
 * Get size with scale factor
 * will use this for scale sizes for different phones and screen resolutions
 *
 * @param {number} size - original size
 */
export const scaleWidth = (size: number) => {
  return PixelRatio.roundToNearestPixel(size * (width / MOCKUP_WIDTH));
};
/**
 * Get size with scale factor
 * will use this for scale sizes for different phones and screen resolutions
 *
 * @param {number} size - original size
 */
export const scaleHeight = (size: number) => {
  return PixelRatio.roundToNearestPixel(size * (height / MOCKUP_HEIGHT));
};

export const scaleFont = scaleHeight;
