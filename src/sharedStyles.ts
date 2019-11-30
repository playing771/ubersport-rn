import { StyleSheet } from 'react-native';
import { HEADER_BACKGROUND } from './constants/Colors';
import { isAndroid } from './utils/deviceInfo';

export const BASE_PADDING = 24;

const sharedStyles = StyleSheet.create({
  paddingHorizontal: { paddingHorizontal: BASE_PADDING },
  header: {
    backgroundColor: HEADER_BACKGROUND,
    borderBottomColor: '#303F79',
  },
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
  },
  headerBackTitleStyle: { color: 'white' },
  headerBackIcon: { marginLeft: 12, marginRight: 8 },
  borderLessHeader: isAndroid ? { elevation: 0 } : { borderBottomWidth: 0 },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerlessScreen: isAndroid ? { paddingTop: 24 } : {},
});

export default sharedStyles;
