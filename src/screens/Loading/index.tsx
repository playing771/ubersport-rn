import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, Text, View } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import { NavigationInjectedProps } from 'react-navigation';
import useAvaliableSportsQuery from '../../api/sports/useAvaliableSportsQuery';
import ErrorCard from '../../components/ErrorCard';
import useAppContext from '../../hooks/useAppContext';
import { NavigationRoot } from '../../navigation/roots';

interface IProps extends NavigationInjectedProps {}

const ANIMATION_DURATION = 2000;
const TITLE = 'Загрузка';

export default function LoadingScreen(props: IProps) {
  const { setUser } = useAppContext();
  // получаем доступные виды спорта и храняим их в аполо кэш
  const { error, loading } = useAvaliableSportsQuery();

  const bootstrapAsync = async () => {
    // AsyncStorage.clear(); // TODO: REMOVE
    const user = await AsyncStorage.getItem('user');

    if (user) {
      setUser(JSON.parse(user));
    }

    props.navigation.navigate(NavigationRoot.Auth);
    // props.navigation.navigate(NavigationRoot.FindGame);
    // props.navigation.navigate(NavigationRoot.Location);
    // props.navigation.navigate(NavigationRoot.Participants, { gameId: '5d6c14e9cb86d50025bc77f9' });
  };

  if (error) {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" />
        <ErrorCard error={error} position="CENTER" />
      </View>
    );
  }

  if (!loading && !error) {
    bootstrapAsync();
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <AnimatedView
        style={styles.contentContainer}
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        useNativeDriver={true}
        duration={ANIMATION_DURATION}
      >
        <Text style={styles.title}>{TITLE}</Text>
        <ActivityIndicator size="small" color="white" style={styles.loader} />
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#101F44',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: { flexDirection: 'row', alignItems: 'center' },
  title: { color: 'white', fontSize: 18 },
  loader: { marginLeft: 12 },
});
