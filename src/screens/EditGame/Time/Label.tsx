import * as React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
  dateStart: number;
  dateEnd: number;
}

const TimeLabel: React.FC<IProps> = ({ dateStart, dateEnd }) => {
  console.log('dateStart,dateEnd', dateStart, dateEnd);

  return (
    <View>
      <Text style={styles.mainText}>{getFormattedDateStart(dateStart)}</Text>
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
  subText: { color: '#AAB7C1' }
});

function getFormattedDateStart(dateStart: number) {
  const _date = moment(dateStart);
  const FORMAT = 'ddd DD MMMM';
  return _date.format(FORMAT)[0].toUpperCase() + _date.format(FORMAT).substr(1);
}

function getFormattedTime(date: number) {
  const _date = moment(date);
  const FORMAT = 'HH:mm';
  return _date.format(FORMAT);
}

export default TimeLabel;
