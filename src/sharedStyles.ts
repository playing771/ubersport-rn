import { StyleSheet, Platform } from 'react-native';
import { HEADER_BACKGROUND } from './constants/Colors';
import { isAndroid } from './utils/deviceInfo';

export const BASE_PADDING = 24;

const sharedStyles = StyleSheet.create({
  paddingHorizontal: { paddingHorizontal: BASE_PADDING },
  header: {
    backgroundColor: HEADER_BACKGROUND,
    borderBottomColor: '#303F79',
  },
  borderLessHeader: isAndroid ? { elevation: 0 } : { borderBottomWidth: 0 },
});

export default sharedStyles;
