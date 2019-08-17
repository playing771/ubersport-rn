import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import UButton from '../../components/UButton';
import Colors from '../../constants/Colors';
import CloseButton from './CloseButton';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';

interface IProps {}

function NotAuthorizedScreen(props: IProps) {
  const { goBack, navigate } = useNavigation();

  const closeBtnPressHanlde = () => {
    goBack();
  };

  const loginBtnPressHandle = () => {
    navigate(NavigationRoot.Auth);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <View
          style={{
            // backgroundColor: '#F1F1F5',
            paddingHorizontal: 24
            // paddingBottom: 12
          }}
        >
          <CloseButton onPress={closeBtnPressHanlde} />
        </View>
        <View
          style={{
            paddingHorizontal: 24
          }}
        >
          <Text
            style={{
              color: '#333',
              // color: 'white',
              fontSize: 26,
              // fontFamily: 'Avenir',
              fontWeight: '700',
              paddingVertical: 20,
              width: '80%'
            }}
          >
            Чтобы продолжить, Вы должны авторизоваться!
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 24,
            backgroundColor: '#F1F1F5',
            flex: 1
          }}
        >
          <UButton
            title="Войти или зарегистрироваться"
            backgroundColor={Colors.green}
            style={{ width: '80%', alignSelf: 'flex-start' }}
            rounded={true}
            onPress={loginBtnPressHandle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// export default withAdaptiveScreen(NotAuthorizedScreen, adaptiveScreenOptions);

export default NotAuthorizedScreen;

NotAuthorizedScreen.navigationOptions = {
  header: null
  // headerTransparent: true
  // headerStyle: {
  //   backgroundColor: '#1C2A4C'
  // }
  // headerTitleStyle: { color: 'white' },
  // headerBackTitleStyle: { color: 'white' },
  // headerRight: (
  //   <UButton
  //     onPress={() => alert('This is a button!')}
  //     // iconStyle={{ width: 20, height: 20 }}
  //     backgroundColor="transparent"
  //     style={{ marginRight: 12 }}
  //   >
  //     <Ionicons name="ios-log-out" size={30} color="#F84472" />
  //   </UButton>
  // )
};
