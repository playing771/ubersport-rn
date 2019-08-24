import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UButton from '../UButton/index';

interface IProps {
  label?: string;
  options: [string, string];
  onChange?: (optionsState: string) => void;
}

export function USwitch({ label, options, onChange }: IProps) {
  const [optionsState, setOptionsState] = useState({ [options[0]]: true, [options[1]]: false });

  const handleChangeState = (index: number) => {
    if (!optionsState[index]) {
      if (index === 0) {
        setOptionsState({
          [options[0]]: true,
          [options[1]]: false,
        });
      } else {
        setOptionsState({
          [options[1]]: true,
          [options[0]]: false,
        });
      }

      if (onChange) {
        onChange(options[0] ? options[0] : options[1]);
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.btnsContainer}>
        <SwitchBtn
          active={optionsState[options[0]]}
          title={options[0]}
          onPress={() => handleChangeState(0)}
        />
        <SwitchBtn
          active={optionsState[options[1]]}
          title={options[1]}
          onPress={() => handleChangeState(1)}
        />
      </View>
    </View>
  );
}

interface IProps {}

interface IToggleBtnProps {
  active: boolean;
  title: string;
  onPress: () => void;
}

const SwitchBtn = ({ active, title, onPress }: IToggleBtnProps) => {
  return (
    <UButton
      title={title}
      style={styles.button}
      backgroundColor={active ? '#56BBBC' : '#F9FAFB'}
      textStyle={active ? styles.activeTest : styles.text}
      onPress={onPress}
      underlayColor={'#56BBBC'}
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
