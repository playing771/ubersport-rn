import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFormattedDate, getFormattedTime } from '../../../utils/dateUtils';

interface IProps {
  dateStart: number;
  dateEnd: number;
}

const TimeLabel: React.FC<IProps> = ({ dateStart, dateEnd }) => {
  // console.log('dateStart,dateEnd', dateStart, dateEnd);

  return (
    <View>
      <Text style={styles.mainText}>{getFormattedDate(dateStart)}</Text>
      <View style={styles.subTextContainer}>
        <Text style={styles.subText}>{getFormattedTime(dateStart)}</Text>
        <Text style={styles.subText}> - </Text>
        <Text style={styles.subText}>{getFormattedTime(dateEnd)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainText: { color: '#5F6B8D' },
  subTextContainer: { flexDirection: 'row', paddingTop: 5 },
  subText: { color: '#AAB7C1' },
});

export default TimeLabel;
