import React from 'react';
import { StyleSheet, View } from 'react-native';

import ProfileInfo from './Info';
import { ScrollView } from 'react-native';
import ProfileGamesList from './GamesList';
import { GameStatus } from '../../api/games/types';

import { NavigationRoot } from '../../navigation/roots';
import useNavigation from '../../hooks/useNavigation';

interface IProps {
  userId: string;
}

const Profile = ({ userId }: IProps) => {
  const { navigate } = useNavigation();
  const onGameCardPress = (gameId: string) => {
    navigate(NavigationRoot.GameInfo, { gameId });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ProfileInfo id={userId} />
      <View style={styles.subContainer}>
        <ProfileGamesList
          userId={userId}
          onGamePress={onGameCardPress}
          status={GameStatus.Pending}
          title="Активные игры"
          emptyText="Активных игр нет"
        />
        <ProfileGamesList
          userId={userId}
          onGamePress={onGameCardPress}
          status={GameStatus.Finished}
          title="История игр"
          emptyText="Список истории игр пуст"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#E9E9EF',
    flex: 1,
    paddingBottom: 15,
  },
});

export default Profile;
