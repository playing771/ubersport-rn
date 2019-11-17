import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';
import { CREATE_USER_GQL, ICreateUserMutationVariables } from '../../api/user/createUser';
import emailValidate, { IExistEmail } from '../../api/user/emailValidate';
import login, { IAuthResult } from '../../api/user/login';
import { IUserWithToken } from '../../api/user/types';
import UButton from '../../components/buttons/UButton';
import ErrorCard from '../../components/ErrorCard/index';
import withAdaptiveScreen from '../../components/hocs/WithAdaptiveScreen';
import { IAdaptiveScreenOptions } from '../../components/hocs/WithAdaptiveScreen/index';
import withAppContext from '../../components/hocs/WithAppContext';
import { KeyboardView } from '../../components/KeyboardVew';
import UWizard from '../../components/UWizard/index';
import { NavigationRoot } from '../../navigation/roots';
import { IAppContextInjectedProp } from '../../utils/context/sports';
import SignUpActive from './email/active';
import SignUpPassed from './email/passed';
import favoriteSportsActive from './favoriteSports/active';
import LoginForm from './LoginForm/index';
import PasswordActive from './password/active';
import PasswordPassed from './password/passed';
import SubmitPasswordActive from './submitPassword/active';
import SubmitPasswordPassed from './submitPassword/passed';
import SignInScreenTitle from './Title';
import UserInfoActive from './userInfo/active';
import UserInfoPassed from './userInfo/passed';

interface IProps extends NavigationInjectedProps, IAppContextInjectedProp {}

type IActionType = 'SIGNIN' | 'SIGNUP' | undefined;

interface IState {
  type: IActionType;
  userEmail: string;
  loading: boolean;
  badCredentials: boolean;
  // signUpVariables?: ICreateUserMutationVariables;
}

const steps = [
  { active: SignUpActive, passed: SignUpPassed }, // validateFn: validateEmail
  {
    active: PasswordActive,
    passed: PasswordPassed,
    // validateFn: passwordValidateFn
  },
  {
    active: SubmitPasswordActive,
    passed: SubmitPasswordPassed,
    // validateFn: submitPasswordValidateFn
  },
  { active: UserInfoActive, passed: UserInfoPassed },
  { active: favoriteSportsActive },
];

@withAppContext
class SingInScreen extends React.Component<IProps, IState> {
  static navigationOptions: NavigationStackOptions = {
    header: null,
    // title: 'Вход или регистрация',
    // headerTitleStyle: {
    //   color: '#fff',
    //   fontWeight: '400'
    // },
    // headerStyle: { backgroundColor: '#101F44' }
    // headerTransparent: true // TODO: fixs
  };

  state: IState = {
    type: undefined,
    userEmail: '',
    loading: false,
    badCredentials: false,
  };

  loginHandle = async (data: IAuthResult) => {
    this.toggleLoading();
    if (!data.accessToken || !data.user) {
      this.showBadCredentials();
    } else {
      const { _id, ...user } = data.user;
      const userWithToken: IUserWithToken = {
        // ...data.user,
        ...user,
        id: _id,
        token: data.accessToken,
      };

      await AsyncStorage.setItem('user', JSON.stringify(userWithToken));
      this.props.ctx.setUser(userWithToken);
      this.props.navigation.navigate(NavigationRoot.FindGame);
    }
  };

  login = async (email: string, password: string) => {
    this.toggleLoading();
    login(email, password)
      .then(this.loginHandle)
      .catch(err => {
        console.log(err);
        this.toggleLoading();
      });
  };

  testLoginHanlde = () => {
    login('maxpayne7@yandex.ru', '123')
      .then(this.loginHandle)
      .catch(err => {
        console.log(err);
        this.toggleLoading();
      });
  };

  testLoginHanlde2 = () => {
    login('playing771@gmail.com', '123')
      .then(this.loginHandle)
      .catch(err => {
        console.log(err);
        this.toggleLoading();
      });
  };

  stepPassedHandle = async (stepIndex: number, text?: string) => {
    if (stepIndex === 0 && text) {
      const checkResult: IExistEmail = await emailValidate(text);

      this.setState({
        type: checkResult.isExist ? 'SIGNIN' : 'SIGNUP',
        userEmail: checkResult.email,
      });
    }
  };

  changeEmailHandle = () => {
    this.setState({
      type: 'SIGNUP',
      userEmail: '',
      badCredentials: false,
    });
  };

  hideBadCredentials = () => {
    this.setState({ badCredentials: false });
  };

  signUp = async (result: { [key: number]: any }, mutate: (mutation: any) => Promise<any>) => {
    const signUpVariables: ICreateUserMutationVariables = {
      email: result[0],
      password: result[1],
      nickname: result[3].login,
      firstName: result[3].name,
      lastName: result[3].lastName,
      // middleName?: string;
      // dateOfBirth?: number;
      favoriteSports: result[4].favoriteSports,
    };
    mutate({
      mutation: CREATE_USER_GQL,
      variables: signUpVariables,
    })
      .then((data: any) => {})
      .catch(error => {});
    // console.log('DATA', data);

    // this.setState({ signUpVariables });
  };

  private showBadCredentials() {
    this.setState({ badCredentials: true });
  }

  private toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  private renderHeader(type: IActionType) {
    switch (type) {
      case 'SIGNUP':
        return <SignInScreenTitle user={this.state.userEmail} text="Новый пользователь" />;

      case 'SIGNIN':
        return <SignInScreenTitle user={this.state.userEmail} text="Логин" />;
      default:
        return 'Вход или регистрация';
    }
  }

  private renderContent() {
    const { type, userEmail, loading, badCredentials } = this.state;
    return (
      <KeyboardView>
        {type === 'SIGNUP' || type === undefined ? (
          <>
            <UWizard
              header={this.renderHeader(type)}
              onStepPass={this.stepPassedHandle}
              steps={steps}
              submitHandle={this.signUp}
            />
            <UButton title="Тест Логин" onPress={this.testLoginHanlde} />
            <UButton title="Тест Логин2" onPress={this.testLoginHanlde2} />
          </>
        ) : (
          <>
            <LoginForm
              userEmail={userEmail}
              submitHandle={this.login}
              loading={loading}
              hideErroHandle={this.hideBadCredentials}
              changeEmailHandle={this.changeEmailHandle}
            />
            <UButton title="Тест Логин" onPress={this.testLoginHanlde} />
            <UButton title="Тест Логин2" onPress={this.testLoginHanlde2} />
            <ErrorCard
              error="Неверно указан пароль. Пожалуйста, попробуйте еще раз!"
              show={badCredentials}
            />
          </>
        )}
      </KeyboardView>
    );
  }

  public render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const screenOptions: IAdaptiveScreenOptions = {
  // transparentHeader: true,
  gradient: { colors: ['#101F44', '#101F44'] },
  barStyle: 'light-content',
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#101F44',
  },
  socialIcon: {
    marginRight: 12,
  },
  fbIcon: {
    fontSize: 32,
    color: 'white',
    marginLeft: -2,
  },
  mainText: { color: 'white', fontWeight: '600' },
  subText: { color: '#CBD6F2', marginTop: 6 },
  orText: {
    color: '#636F8F',
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  inputsContainer: {},
  inputWrapper: { marginTop: 12 },
  input: {
    backgroundColor: 'white',
    height: 42,
    lineHeight: 42,
    // borderRadius: 6,
    // paddingHorizontal: 6,
    color: '#5F6B8D',
  },
});

export default withNavigation(withAdaptiveScreen(SingInScreen, screenOptions));
