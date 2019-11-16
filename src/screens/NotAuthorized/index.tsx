import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import UButton from '../../components/buttons/UButton';
import Colors from '../../constants/Colors';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import sharedStyles from '../../sharedStyles';

interface IProps {}

const TITLE = 'Чтобы продолжить, Вы должны авторизоваться!';
const BTN_TITLE = 'Войти или зарегистрироваться';

export default function NotAuthorizedScreen(props: IProps) {
  const { navigate } = useNavigation();

  const loginBtnPressHandle = () => {
    navigate(NavigationRoot.Auth);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <View style={styles.container}>
        <View style={sharedStyles.paddingHorizontal}>
          <Text style={styles.header}>{TITLE}</Text>
        </View>
        <View style={[styles.contentContainer, sharedStyles.paddingHorizontal]}>
          <UButton
            title={BTN_TITLE}
            backgroundColor={Colors.green}
            style={styles.button}
            rounded={true}
            onPress={loginBtnPressHandle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

NotAuthorizedScreen.navigationOptions = {
  headerStyle: { ...sharedStyles.borderLessHeader },
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    color: '#333',
    // color: 'white',
    fontSize: 26,
    // fontFamily: 'Avenir',
    fontWeight: '700',
    paddingVertical: 20,
    width: '80%',
  },
  contentContainer: {
    paddingTop: 24,
    backgroundColor: '#F1F1F5',
    flex: 1,
  },
  button: { width: '80%', alignSelf: 'flex-start' },
});
