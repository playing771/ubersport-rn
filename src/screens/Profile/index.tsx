import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GameStatus } from '../../api/games/types';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import { BASE_PADDING } from '../../sharedStyles';
import ProfileGamesList from './GamesList';
import { ProfileInfo } from './Info';

interface IProps {
  userId: string;
}

const Profile = ({ userId }: IProps) => {
  const { navigate } = useNavigation();
  const onGameCardPress = (gameId: string) => {
    navigate(NavigationRoot.GameInfo, { gameId });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
    paddingBottom: BASE_PADDING,
  },
});

export default Profile;
