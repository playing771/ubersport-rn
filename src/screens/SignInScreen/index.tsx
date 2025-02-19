import React from 'react';
import { AsyncStorage, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';
import { CREATE_USER_GQL, ICreateUserMutationVariables } from '../../api/user/createUser';
import emailValidate, { IExistEmail } from '../../api/user/emailValidate';
import { login, socialLogin, IAuthResult } from '../../api/user/login';
import { IUserWithToken, SocialAuth } from '../../api/user/types';
import BackButton from '../../components/buttons/BackButton';
import ErrorCard from '../../components/ErrorCard/index';
import withAppContext from '../../components/hocs/WithAppContext';
import { KeyboardView } from '../../components/KeyboardVew';
import UWizard from '../../components/UWizard/index';
import UWizardStepIndicator from '../../components/UWizard/StepIndicator';
import { NavigationRoot } from '../../navigation/roots';
import sharedStyles from '../../sharedStyles';
import { IAppContextInjectedProp } from '../../utils/context/sports';
import { isAndroid } from '../../utils/deviceInfo';
import SignUpActive, { validateEmail } from './email/active';
import SignUpPassed from './email/passed';
import favoriteSportsActive from './favoriteSports/active';
import { LoginForm } from './LoginForm/index';
import PasswordActive, { passwordValidateFn } from './password/active';
import PasswordPassed from './password/passed';
import SubmitPasswordActive, { submitPasswordValidateFn } from './submitPassword/active';
import SubmitPasswordPassed from './submitPassword/passed';
import SignInScreenTitle from './Title';
import UserInfoActive from './userInfo/active';
import UserInfoPassed from './userInfo/passed';

interface IProps extends NavigationInjectedProps, IAppContextInjectedProp {}

type IActionType = 'SIGNIN' | 'SIGNUP' | undefined;

export interface ISocialAuth {
  email: string | null;
  external: SocialAuth;
  idToken: string;
  meta?: object;
}

interface IState {
  type: IActionType;
  userEmail: string;
  loading: boolean;
  badCredentials: boolean;
  passed: number[];
  // signUpVariables?: ICreateUserMutationVariables;
}

const steps = [
  { active: SignUpActive, passed: SignUpPassed, validateFn: validateEmail }, // validateFn: validateEmail
  // { active: SignUpActive, passed: SignUpPassed },
  {
    active: PasswordActive,
    passed: PasswordPassed,
    validateFn: passwordValidateFn,
  },
  {
    active: SubmitPasswordActive,
    passed: SubmitPasswordPassed,
    validateFn: submitPasswordValidateFn,
  },
  {
    active: UserInfoActive,
    passed: UserInfoPassed,
    validateFn: (data: any) => {
      return data && data.login.length;
    },
  },
  { active: favoriteSportsActive },
];

@withAppContext
class SingInScreen extends React.Component<IProps, IState> {
  static navigationOptions: NavigationStackOptions = {
    header: null,
  };

  // FIXME: passed - костыль, чтобы вставвить прогресс в хедер компонента, который не относится к UWizard.
  // Внутри UWizard уже есть state с passed, сейчас мы дублируем этот стейт в 2х местах, передавая его снизу вверхы

  state: IState = {
    type: undefined,
    userEmail: '',
    loading: false,
    badCredentials: false,
    passed: [],
  };

  socialLogin = async (data: ISocialAuth) => {
    const { email, external = 'GOOGLE', idToken } = data;
    const result = await socialLogin(email, external, idToken);
    this.loginHandle(result);
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

  setPassed = (passed: number[]) => {
    this.setState({ passed });
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
      favoriteSports: result[4],
    };
    // console.log('result', result);

    // console.log('signUpVariables', signUpVariables);

    mutate({
      mutation: CREATE_USER_GQL,
      variables: signUpVariables,
    })
      .then((data: any) => {
        login(signUpVariables.email!, signUpVariables.password!).then(this.loginHandle);
      })
      .catch(error => {
        console.log('ERROR', error);
      });
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
        return (
          <SignInScreenTitle
            user={this.state.userEmail}
            text="Новый пользователь"
            onPress={this.exitSignIn}
          />
        );

      case 'SIGNIN':
        return (
          <SignInScreenTitle
            user={this.state.userEmail}
            text="Здравствуйте"
            onPress={this.exitSignIn}
          />
        );
      default:
        return 'Вход или регистрация';
    }
  }

  exitSignIn = () => {
    this.props.navigation.navigate(NavigationRoot.FindGame);
  };

  // goBackToStart = () => {
  //   console.log('goBackToStart');

  //   this.props.navigation.navigate(NavigationRoot.Auth);
  // };

  private renderContent() {
    const { type, userEmail, loading, badCredentials } = this.state;
    return (
      <SafeAreaView style={[styles.container, sharedStyles.headerlessScreen]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          {typeof this.renderHeader(type) === 'string' ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <BackButton style={{ marginLeft: 12 }} onPress={this.exitSignIn} />
              <Text style={styles.header}>{this.renderHeader(type)}</Text>
            </View>
          ) : (
            this.renderHeader(type)
          )}
          <UWizardStepIndicator passed={this.state.passed} total={steps.length} />
        </View>
        <KeyboardView
          extraScrollHeight={isAndroid ? 120 : 0}
          keyboardVerticalOffset={isAndroid ? 60 : 120}
        >
          {type === 'SIGNUP' || type === undefined ? (
            <>
              <UWizard
                // header={this.renderHeader(type)}
                onStepPass={this.stepPassedHandle} // FIXME: лютый костыль
                setPassed={this.setPassed}
                steps={steps}
                submitHandle={this.signUp}
                skipAndLogin={this.socialLogin}
              />
              {/* <UButton title="Тест Логин" onPress={this.testLoginHanlde} />
              <UButton title="Тест Логин2" onPress={this.testLoginHanlde2} /> */}
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
              {/* <UButton title="Тест Логин" onPress={this.testLoginHanlde} />
              <UButton title="Тест Логин2" onPress={this.testLoginHanlde2} /> */}
              <ErrorCard
                error="Неверно указан пароль. Пожалуйста, попробуйте еще раз!"
                show={badCredentials}
              />
            </>
          )}
        </KeyboardView>
      </SafeAreaView>
    );
  }

  public render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

// const screenOptions: IAdaptiveScreenOptions = {
//   // transparentHeader: true,
//   gradient: { colors: ['#101F44', '#101F44'] },
//   barStyle: 'light-content',
// };

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  androidTopPadding: { paddingTop: 24 },
  headerContainer: {
    // borderBottomColor: '#141720',
    // borderBottomWidth: 2,
    backgroundColor: '#505B77',
  },
  header: {
    color: 'white',
    paddingVertical: 12,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default withNavigation(SingInScreen);
