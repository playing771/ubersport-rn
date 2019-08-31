import * as React from 'react';
import withTouch from '../../../components/hocs/WIthTouch';
import { View, ViewStyle, StyleProp, StyleSheet, Text } from 'react-native';

interface IProps {
  title: string;
  value: string;
  style?: StyleProp<ViewStyle>;
}

const FilterButton: React.FC<IProps> = props => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.value}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
  },
  title: {
    color: '#dcdcdc',
    textTransform: 'uppercase',
    fontSize: 12,
    paddingBottom: 3,
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    color: '#f7f7f7',
    fontSize: 16,
    fontWeight: '300',
    flex: 1,
  },
});

export default withTouch(FilterButton);
