import React, { useEffect, useState } from 'react';
import useAppContext from '../../hooks/useAppContext';
import UserForm from './UserForm';
import UButton from '../../components/UButton';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Colors, {
  HEADER_BACKGROUND,
  GREEN_BUTTON_BACKGROUND,
  MAIN_TITLE_COLOR,
} from '../../constants/Colors';
import { NavigationScreenProps } from 'react-navigation';
import useNavigation from '../../hooks/useNavigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated, Text } from 'react-native';
import SportsList from '../../components/SportsList';
import UTabsView from '../../components/UTabView';

interface IProps extends NavigationScreenProps {}

const FirstRoute = userId => <UserForm id={userId} />;

const SecondRoute = () => <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />;

const EditProfileScreen = (props: IProps) => {
  const { user } = useAppContext();
  const { setParams } = useNavigation();
  const [currentTabState, setTabState] = useState({
    index: 0,
    routes: [
      { key: '1', title: 'Личное' },
      { key: '2', title: 'Cпорт' },
      { key: '3', title: 'Пароль' },
    ],
  });

  const [sports, setSports] = useState<number[]>([]);

  useEffect(() => {
    setParams({ test: 'test' });
    // setSports(getUser.favoriteSports.map(sport => sport.id));
  }, []);

  const changeSportsHandle = (sportIds: number[]) => {
    setSports(sportIds);
  };

  return (
    <UTabsView
      currentNavState={currentTabState}
      onIndexChange={index => setTabState({ ...currentTabState, index })}
      scenes={{
        1: () => <UserForm id={user.id} />,
        2: () => (
          <>
            <Text style={styles.sportsListTitle}>Избранные виды спорта</Text>
            <SportsList onChange={changeSportsHandle} style={styles.sportsList} />
          </>
        ),
        3: SecondRoute,
      }}
    />
    // <View style={{ flex: 1 }}>
    //   <TabView
    //     navigationState={currentTabState}
    // renderScene={SceneMap({
    //   1: () => <UserForm id={user.id} />,
    //   2: () => (
    //     <>
    //       <Text style={styles.sportsListTitle}>Избранные виды спорта</Text>
    //       <SportsList onChange={changeSportsHandle} style={styles.sportsList} />
    //     </>
    //   ),
    //   3: SecondRoute,
    // })}
    //     renderTabBar={_renderTabBar}
    //     onIndexChange={index => setTabState({ ...currentTabState, index })}
    //     initialLayout={{ width: Dimensions.get('window').width }}
    //     // style={{ flex: 1 }}
    //   />
    // </View>
  );
};

EditProfileScreen.navigationOptions = ({ navigation }) => {
  const clickHandle = () => {
    navigation.getParam('test');
  };

  return {
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND,
    },
    headerTitleStyle: { color: 'white' },
    headerBackTitleStyle: { color: 'white' },
    headerRight: <HeaderRightButton onPress={clickHandle} />,
  };
};

function HeaderRightButton({ onPress }: { onPress: () => void }) {
  // const { getParam } = useNavigation();

  // const pressHandle = () => {
  // 	console.log('CLICK');

  // 	console.log(getParam('save'));
  // };

  return (
    <UButton
      onPress={onPress}
      // iconStyle={{ width: 20, height: 20 }}
      backgroundColor="transparent"
      style={{ marginRight: 12 }}
      title="Cохранить"
      textStyle={{ fontSize: 14 }}
    >
      {/* <Ionicons name="ios-log-out" size={30} color={Colors.purle} /> */}
      {/* <Ionicons name="ios-save" size={30} color={'white'} /> */}
      {/* <AntDesign size={24} color={'white'} name="save"></AntDesign>  */}
    </UButton>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    // flex: 1,
    width: 50,
    alignItems: 'center',
    padding: 16,
  },
  sportsListTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#404F7A',
    paddingBottom: 12,
    paddingTop: 24,
  },
  sportsList: {
    // paddingTop:
  },
});

export default EditProfileScreen;
