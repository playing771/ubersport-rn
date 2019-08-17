import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  progress: number;
}

const ProgressBar: React.SFC<Props> = props => {
  const _styles = _getStyles(props.progress);
  return (
    <View style={_styles.mainContainer}>
      <LinearGradient
        colors={['#01EB51', '#82F748']}
        start={[0, 0]}
        end={[1, 1]}
        style={[_styles.progressBar, _styles.shadow]}
      />
    </View>
  );
};

const _getStyles = (progress: number) => {
  const _styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#F4F7FD',
      width: '100%',
      borderRadius: 50,
      marginVertical: 10
    },
    progressBar: {
      width: `${progress}%`,
      backgroundColor: 'green',
      height: 15,
      borderRadius: 50
    },
    shadow: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 2,
      shadowOpacity: 0.2
    }
  });
  return _styles;
};

export default ProgressBar;
