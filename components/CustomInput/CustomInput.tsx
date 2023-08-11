import { TextInput, TextInputProps } from "react-native-paper";
import { DEFAULT_FONT_ONE } from "../../constants/defaultFonts";
import { PALETTE } from "../../constants/palette";
import { SText } from "../SText";
interface CustomInputProps extends TextInputProps {}

const CustomInput = (props: CustomInputProps) => {
  return (
    <TextInput
      // selectionColor={PALETTE.mainTwo}
      underlineColor={PALETTE.textSecondary}
      activeOutlineColor={PALETTE.textSecondary}
      // @ts-ignore
      style={{ fontFamily: DEFAULT_FONT_ONE }}
      // @ts-ignore
      contentStyle={{ fontFamily: DEFAULT_FONT_ONE }}
      {...props}
      label={props.label && <SText>{props.label}</SText>}
      theme={{
        colors: {
          outline: PALETTE.textSecondary,
          primary: PALETTE.textSecondary,
          text: PALETTE.textPrimary,
          placeholder: PALETTE.textSecondary,
        },
      }}
    />
  );
};

export { CustomInput };
