import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface IProps {
  progress: number;
}

const ProgressBar = (props: IProps) => {
  const styles = _getStyles(props.progress);
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#01EB51', '#82F748']}
        start={[0, 0]}
        end={[1, 1]}
        style={[styles.progressBar, styles.shadow]}
      />
    </View>
  );
};

const _getStyles = (progress: number) => {
  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#F4F7FD',
      // width: '100%',
      borderRadius: 50,
      marginVertical: 10,
      overflow: 'hidden',
    },
    progressBar: {
      width: `${progress}%`,
      backgroundColor: 'green',
      height: 15,
      // borderRadius: 50,
    },
    shadow: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 2,
      shadowOpacity: 0.2,
    },
  });
  return styles;
};

export default ProgressBar;
