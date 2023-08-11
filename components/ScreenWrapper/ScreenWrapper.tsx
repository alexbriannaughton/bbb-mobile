import { RestyleProps, SView } from "..";

interface ScreenWrapperProps extends RestyleProps {
  children?: React.ReactNode;
}

const ScreenWrapper = (props: ScreenWrapperProps) => {
  return (
    <SView
      flex={1}
      paddingTop={"none"}
      backgroundColor="blueSecondary"
      {...props}
      paddingHorizontal="wm"
    />
  );
};

export { ScreenWrapper };
