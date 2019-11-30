import { Ionicons } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import withTouch from '../../../../components/hocs/WIthTouch';

interface IProps {
  icon: string;
  label: string | ReactElement;
  extra?: string;
}

const EditTimeItemForm: React.FC<IProps> = props => {
  return (
    <View style={styles.container}>
      <Ionicons name={props.icon} size={22} color="#AABAC2" />
      {typeof props.label === 'string' ? (
        <>
          <Text style={styles.text}>{props.label}</Text>
          <Text style={styles.extra}>{props.extra}</Text>
        </>
      ) : (
        <>
          {props.label}
          <Text style={styles.extra}>{props.extra}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  text: { color: '#596588', paddingLeft: 18, fontSize: 16 },
  extra: { paddingLeft: 10, color: '#B4BFC9', fontWeight: '600', fontSize: 16 },
});

export default withTouch(EditTimeItemForm);
