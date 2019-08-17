import React from "react";
import { AppContext } from "../../other/context/sports";
import Profile from "../Profile";
import { gradient } from "../../constants/generalStyles";
import withAdaptiveScreen, {
  IAdaptiveScreenOptions
} from "../../components/hocs/WithAdaptiveScreen";
import { NavigationScreenProps } from "react-navigation";
import useAuthCheck from "../../hooks/useAuthCheck";
import useAppContext from "../../hooks/useAppContext";

import useNavigation from "../../hooks/useNavigation";
import EditProfileButton from "./EditProfileButton";
import { HEADER_BACKGROUND } from "../../constants/Colors";
import GradientWrapper from "../../components/AdaptiveScreen/GradientWrapper";
import shareStyles from "../styles";

interface IProps {}

const adaptiveScreenOptions: IAdaptiveScreenOptions = {
  transparentHeader: true,
  gradient: gradient,
  barStyle: "light-content"
};

// @withAppContext
function MyProfileScreen(props: IProps) {
  const { user } = useAppContext();
  const { authCheck } = useAuthCheck();
  const { navigate } = useNavigation();

  console.log("user", user);

  // setParams({});

  // console.log('isLoggedIn', isLoggedIn);

  // authCheck('redirect');

  return (
    <GradientWrapper gradient={gradient}>
      <Profile userId={user.id} />
    </GradientWrapper>
  );
}

MyProfileScreen.navigationOptions = ({ navigation }: any) => {
  // const { authCheck } = useAuthCheck();
  // console.log('authCheck()', authCheck());
  // console.log('navigation', navigation);

  return {
    headerTitleStyle: {
      color: "#fff",
      fontWeight: "400"
    },
    headerStyle: shareStyles.header,
    title: "Ваш профиль",

    headerRight: <EditProfileButton onPress={() => alert("EDIT")} />
  };
};

// export default withAdaptiveScreen(MyProfileScreen, adaptiveScreenOptions);
export default MyProfileScreen;
