import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  textColor: string;
  title: string;
  // length: number;
}

const GameTitle: React.SFC<Props> = props => {
  const _styles = _getStyles(props.textColor);
  return (
    <View style={_styles.mainContainer}>
      <Text style={_styles.mainText} numberOfLines={2} ellipsizeMode="tail">
        {props.title}
      </Text>
      {/* <Text style={_styles.subText}>{`${_getTime(props.length)} ЧАСОВ`}</Text> */}
    </View>
  );
};

// const _getTime = (time: number): string => {
//   return (
//     String(time).split('.')[0] +
//     ':' +
//     (time % 1 === 0 ? '00' : String(Math.floor(60 * (time % 1))))
//   );
// };

const _getStyles = (textColor: string) => {
  const _styles = StyleSheet.create({
    mainContainer: {},
    mainText: {
      color: textColor,
      fontWeight: '800',
      fontSize: 18,
    },
    subText: {
      color: textColor,
      fontWeight: '500',
      fontSize: 14,
      marginTop: 2,
    },
  });
  return _styles;
};

export default GameTitle;
