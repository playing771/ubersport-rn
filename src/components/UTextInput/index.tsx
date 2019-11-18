import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface IProps extends TextInputProps {
  label?: string;
  value?: string;
  initialValue?: string;
  onChangeText?: (text: string) => void;
}

/**
 * Два варианта использования:
 * 1) передаем initialValue (первоначальное значение), при изменении новыые значения пишутся во внутренний state, вызывается onChange
 * 2) передаем value, тогда все изменения пишутся через onChange во внешний state, внутренний state игнорируется
 */
export default function UTextInput({ label, onChangeText, value, initialValue, ...rest }: IProps) {
  const [innerValue, setInnerValue] = useState(initialValue);

  const changeHandle = (text: string) => {
    setInnerValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value !== undefined ? value : innerValue}
        onChangeText={changeHandle}
        style={styles.text}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingTop: 24,
    paddingBottom: 12,
    color: '#404F7A',
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
    borderWidth: 1,
    borderColor: '#DFE3E7',
    height: 45,
    // lineHeight: 45,
    borderRadius: 4,
    paddingHorizontal: 12,
  },
});
