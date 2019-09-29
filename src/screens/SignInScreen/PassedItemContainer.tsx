import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UButton from '../../components/buttons/UButton';

interface IProps {
  index?: number;
  onPressHandle: (stepIndex: number) => void;
  text: string;
}

const PassedItemContainer = ({ index = 0, onPressHandle, text }: IProps) => {
  return (
    <View style={styles.wrapper}>
      <UButton
        icon="ios-create"
        circle={true}
        backgroundColor="#101F44"
        style={styles.editBtn}
        iconStyle={styles.editBtnIcon}
        onPress={() => onPressHandle(index)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainText: { color: 'white', fontWeight: '600', fontSize: 16 },

  wrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 12
  },
  editBtn: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingLeft: 2,
    alignSelf: 'center'
  },
  editBtnIcon: { fontSize: 20 },
  textContainer: {
    backgroundColor: '#1C2F5E',
    padding: 16,
    borderRadius: 14,
    borderBottomRightRadius: 0,
    flex: 1,
    marginLeft: 12
  }
});

export default PassedItemContainer;
