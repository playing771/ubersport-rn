import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  progress: number;
  max?: number;
}

export function ProgressBarCardBlock({ progress, max }: IProps) {
  const styles = _getStyles(progress);
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={max ? ['#01EB51', '#82F748'] : ['#B3B9CF', '#929CC8']}
        start={[0, 0]}
        end={[1, 1]}
        style={[styles.ProgressBarCardBlock, styles.shadow]}
      />
    </View>
  );
}

const _getStyles = (progress: number) => {
  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#F4F7FD',
      // width: '100%',
      borderRadius: 50,
      marginVertical: 10,
      overflow: 'hidden',
    },
    ProgressBarCardBlock: {
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
