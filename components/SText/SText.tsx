import { createText } from "@shopify/restyle";
import { DEFAULT_FONT_ONE } from "../../constants/defaultFonts";
import { StyleTheme } from "../../constants/theme";

const PreStext = createText<StyleTheme>();

// YOOO this is pretty insane actually.
export type StextProps = React.ComponentProps<typeof PreStext>;

const SText = (props: StextProps) => {
  return (
    <PreStext
      allowFontScaling={false}
      style={{ fontFamily: DEFAULT_FONT_ONE}}
      {...props}
    />
  );
};

export { SText };
