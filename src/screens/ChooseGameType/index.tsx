import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { AppContext } from '../../other/context/sports';
import { NavigationScreenProps } from 'react-navigation';
import { CardNameObj } from '../../components/SportCard/index';
import SportCard from '../../components/SportCard/index';
import { NavigationRoot } from '../../navigation/roots';
import withAppContext from '../../components/hocs/WithAppContext';
import useNavigation from '../../hooks/useNavigation';

interface IProps {}

interface State {
  activeSport: string | undefined;
}

const params = {
  size: 60,
  iconColorActive: 'white',
  color: '#999a9b',
};

export default function ChooseGameTypeScreen(props: IProps) {
  const { navigate } = useNavigation();
  // const useAvaliableSp

  // static navigationOptions = {
  //   title: "Новая игра"
  // };

  // state = {
  //   activeSport: undefined,
  // };

  // const getTextIconColor = (sport: string): string => {
  //   // console.log(sport, state.activeSport);
  //   return state.activeSport === sport ? params.iconColorActive : params.color;
  // };

  // const onCardPress = (sport: CardNameObj): void => {
  //   setState({ activeSport: sport.id }, () => {
  //     navigate(NavigationRoot.EditGame, { sport });
  //   });
  // };

  // const renderItem = ({ item }: { item: string }) => {
  //   return (
  //     <SportCard
  //       sport={props.ctx.sports[item]}
  //       onPress={onCardPress}
  //       // onShowUnderlay={onShowUnderlay}
  //       // onHideUnderlay={onHideUnderlay}
  //       textStyle={[s.cardTitle]}
  //       iconColor={getTextIconColor(item)}
  //       style={s.card}
  //     />
  //   );
  // };

  // const { sports } = props.ctx;
  return (
    <View style={s.mainContainer}>
      <Text style={s.header}>Какую игру вы хотите создать?</Text>
      {/* <FlatList
        contentContainerStyle={s.cardContainer}
        data={Object.keys(sports)}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={3}
      /> */}
    </View>
  );
}

const keyExtractor = (item: string, index: number) => item;

const s = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: "#E7EAEE",
    // backgroundColor: "#61c037",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  header: {
    color: '#333',
    fontSize: 28,
    fontFamily: 'Avenir',
    fontWeight: '900',
    paddingVertical: 20,
    // paddingHorizontal: 5
  },
  cardContainer: {
    // flexDirection: 'row',

    justifyContent: 'center',
    paddingLeft: 10,
  },
  card: {
    height: 150,
    minWidth: 100,
    flex: 1,
    marginBottom: 5,
    marginRight: 10,
  },
  cardTitle: { color: params.color },
});
