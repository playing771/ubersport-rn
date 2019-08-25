import React, { useState } from 'react';
import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import UButton from '../UButton/index';

export interface ISwitchOption {
  label: string;
  value: string;
}

interface IProps {
  label?: string;
  options: ISwitchOption[];
  onChange?: (value: string) => void;
  initialValue?: string;
}

export function USwitch({ label, options, onChange, initialValue = options[0].value }: IProps) {
  const [activeValue, setActiveValue] = useState(initialValue);

  const handleSwitchPress = (e: GestureResponderEvent, id: string) => {
    setActiveValue(id);
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.btnsContainer}>
        {options.map(option => (
          <SwitchBtn
            active={option.value === activeValue}
            title={option.label}
            onPress={handleSwitchPress}
            id={option.value}
            key={option.value}
          />
        ))}
      </View>
    </View>
  );
}

interface IToggleBtnProps {
  active: boolean;
  title: string;
  onPress: (e: GestureResponderEvent, onClickId: string) => void;
  id: string;
}

const SwitchBtn = ({ active, title, onPress, id }: IToggleBtnProps) => {
  return (
    <UButton
      title={title}
      style={styles.button}
      backgroundColor={active ? '#56BBBC' : '#F9FAFB'}
      textStyle={active ? styles.activeTest : styles.text}
      onPress={onPress}
      underlayColor={'#56BBBC'}
      onClickId={id}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingTop: 12 },
  btnsContainer: { flexDirection: 'row' },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#404F7A',
    paddingVertical: 12,
  },
  button: { flex: 1, height: 50, borderColor: '#DEE2E6' },
  text: { color: '#A8B6BF', fontSize: 16 },
  activeTest: { color: 'white', fontSize: 16 },
});
