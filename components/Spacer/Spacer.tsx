import { scaleHeight, scaleWidth } from "../../constants/layout";
import { SPACING } from "../../constants/spacing";
import { SView } from "../SView";

const SIZES = SPACING;

interface SpacerProps {
  size?: keyof typeof SIZES;
  row?: boolean;
  height?: number;
  width?: number;
  style?: any;
}

const Spacer = ({ size, row, width, height, style }: SpacerProps) => {
  const getWidth = () => {
    if (width) {
      return width;
    }
    if (row) {
      if (size) {
        return scaleWidth(SIZES[size]);
      }
    }
  };

  const getHeight = () => {
    if (height) {
      return height;
    }
    if (!row) {
      if (size) {
        return scaleHeight(SIZES[size]);
      }
    }
    if (row) {
      return SIZES.hxs;
    }
  };

  return (
    <SView
      style={{
        width: getWidth() || SIZES.wm,
        height: getHeight() || SIZES.hm,
        backgroundColor: "transparent",
        ...style,
      }}
    />
  );
};

export default Spacer;
