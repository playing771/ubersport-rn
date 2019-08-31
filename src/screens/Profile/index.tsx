import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import ProfileInfo from './Info';
import { ScrollView } from 'react-native';
import ProfileGamesList from './GamesList';
import { GameStatus } from '../../api/games/types';
import { GET_USER_ACTIVE_GAMES_GQL } from '../../api/games/getUserActiveGames';
import { NavigationRoot } from '../../navigation/roots';
import useNavigation from '../../hooks/useNavigation';
import UButton from '../../components/UButton';

type IProps = { userId: string };

const Profile = ({ userId }: IProps) => {
  const { navigate } = useNavigation();
  const _onGameCardPress = (gameId: string) => {
    navigate(NavigationRoot.GameInfo, { gameId });
  };

  return (
    <ScrollView style={{ height: '100%', overflow: 'visible' }}>
      <ProfileInfo id={userId} />
      <View style={styles.subContainer}>
        {/* <ProfileGamesList
          userId={userId}
          onGamePress={_onGameCardPress}
          status={GameStatus.Pending}
          title="Активные игры"
          emptyText="Активных игр нет"
          query={GET_USER_ACTIVE_GAMES_GQL}
        />
        <ProfileGamesList
          userId={userId}
          onGamePress={_onGameCardPress}
          status={GameStatus.Finished}
          title="История игр"
          emptyText="Список истории игр пуст"
          query={GET_GAMES_GQL}
        /> */}
      </View>
    </ScrollView>
  );
};

Profile.navigationOptions = {
  title: 'TITLE',
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 22,
  },
  headerTransparent: true, // TODO: fix
  headerRight: (
    // <View
    //   style={{
    //     paddingHorizontal: 6,
    //     flexDirection: 'row'
    //     // justifyContent: 'center',
    //     // width: '100%'
    //   }}
    // >
    <UButton
      onPress={() => alert('This is a button!')}
      icon="ios-search"
      iconColor="#dcdcdc"
      // iconStyle={{ width: 20, height: 20 }}
      iconSize={24}
      backgroundColor="transparent"
      style={{ width: 40, height: 40, marginRight: 10 }}
    />
  ),
};

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#E9E9EF',
    height: '100%',
    paddingBottom: 15,
  },
});

export default Profile;
