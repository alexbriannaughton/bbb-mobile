import { TouchableOpacity } from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { SText, StextProps } from "..";
import { PALETTE } from "../../constants/palette";

interface CustomButtonProps extends ButtonProps {
  stextProps?: StextProps;
  onPress?: () => void;
  children: string;
  customContentStyle?: any;
  disabled?: boolean;
  subtitle?: string;
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    onPress,
    children,
    stextProps,
    loading,
    customContentStyle,
    disabled,
    subtitle,
    ...otherProps
  } = props;
  return (
    <TouchableOpacity onPress={onPress} disabled={loading || disabled}>
      <Button
        mode="contained"
        // onPress={onPress}
        disabled={loading || disabled}
        buttonColor={PALETTE.bgTwo}
        contentStyle={[
          {
            alignItems: "flex-end",
            justifyContent: "center",
          },
          { ...customContentStyle },
        ]}
        {...otherProps}
      >
        <SText
          numberOfLines={2}
          //   variant="subheader"
          color="textPrimary"
          {...stextProps}
        >
          {children}
        </SText>
      </Button>
    </TouchableOpacity>
  );
};

export { CustomButton };
