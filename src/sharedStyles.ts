import { StyleSheet } from 'react-native';
import { HEADER_BACKGROUND } from './constants/Colors';

export const PADDING_VALUE = 24;

const sharedStyles = StyleSheet.create({
  paddingHorizontal: { paddingHorizontal: PADDING_VALUE },
  header: {
    backgroundColor: HEADER_BACKGROUND,
    // borderBottomWidth: 1,
    borderBottomColor: '#303F79',
  },
});

export default sharedStyles;
