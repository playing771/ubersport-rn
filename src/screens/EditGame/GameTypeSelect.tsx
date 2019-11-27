import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-animatable';
import { NavigationStackOptions } from 'react-navigation-stack';
import SportsSelect from '../../components/SportsList/SportsSelect';
import { HEADER_BACKGROUND } from '../../constants/Colors';
import useAuthCheck from '../../hooks/useAuthCheck';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import sharedStyles, { BASE_PADDING } from '../../sharedStyles';
import { isIOS } from '../../utils/deviceInfo';

export default function GameTypeSelectScreen() {
  const { navigate } = useNavigation();
  const { authCheck } = useAuthCheck();

  const chooseHandle = (sportId: number | number[]) => {
    navigate(NavigationRoot.EditGame, { sportId });
  };

  return authCheck('redirect') ? (
    <SafeAreaView style={[styles.container, sharedStyles.headerlessScreen]}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Выберите спорт</Text>
        <SportsSelect mode="SINGLE" changeSportFilterHanlde={chooseHandle} />
      </View>
    </SafeAreaView>
  ) : null;
}

const headerOptions: NavigationStackOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HEADER_BACKGROUND },
  contentContainer: { paddingTop: BASE_PADDING / 2, flex: 1, backgroundColor: '#FAFAFA' },
  headerText: {
    textAlign: 'center',
    fontWeight: isIOS ? '600' : '500',
    fontSize: 18,
    paddingVertical: BASE_PADDING,
    color: HEADER_BACKGROUND,
  },
});

GameTypeSelectScreen.navigationOptions = headerOptions;
