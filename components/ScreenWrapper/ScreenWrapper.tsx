import { SView } from "../../components/SView"
import { RestyleProps } from "../../components/SView";

interface ScreenWrapperProps extends RestyleProps {
  children?: React.ReactNode;
}

const ScreenWrapper = (props: ScreenWrapperProps) => {
  return (
    <SView
      flex={1}
      paddingTop={"none"}
      backgroundColor="blueSecondary"
      paddingHorizontal="wxs"
      {...props}
    />
  );
};

export { ScreenWrapper };
