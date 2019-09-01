import React from 'react';
import { StyleSheet } from 'react-native';
import UButton from '../../components/UButton';
import Colors from '../../constants/Colors';

import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import withHeaderLessScreen from '../../components/hocs/withHeaderlessScreen/';

interface IProps {}

const NotAuthorizedScreen = withHeaderLessScreen(
  ScreenContent,
  ' Чтобы продолжить, Вы должны авторизоваться!'
);

function ScreenContent(props: IProps) {
  const { navigate } = useNavigation();

  const loginBtnPressHandle = () => {
    navigate(NavigationRoot.Auth);
  };

  return (
    <UButton
      title="Войти или зарегистрироваться"
      backgroundColor={Colors.green}
      style={styles.button}
      rounded={true}
      onPress={loginBtnPressHandle}
    />
  );
}

const styles = StyleSheet.create({
  button: { width: '80%', alignSelf: 'flex-start' },
});

export default NotAuthorizedScreen;
