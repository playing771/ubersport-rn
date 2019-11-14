import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { IPickerValue } from '../../../components/pickers/BasePicker/types';
import SinglePicker from '../../../components/pickers/SinglePicker';

export interface IRestrictions {
  min: number;
  max: number;
}

interface IProps {
  value?: number;
  onSave: (count: number) => void;
  restrictions: IRestrictions;
}

export function EditPeopleCount(props: IProps) {
  const count: IPickerValue[] = getItems(props.restrictions);

  const onCountChange = useCallback((value: number) => {
    props.onSave(value);
  }, []);

  function getValue() {
    if (typeof props.value === 'undefined') {
      return count[0].value;
    } else {
      return props.value;
    }
  }

  return (
    <View style={styles.container}>
      <SinglePicker onChange={onCountChange} value={getValue()} list={count} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

function getItems({ min, max }: IRestrictions) {
  const array: IPickerValue[] = Array.from({ length: max - min + 2 }, (v, k) => {
    const item: IPickerValue =
      k > 0 ? { label: `${k + min}`, value: k + min } : { label: 'Без ограничений', value: k };
    return item;
  });
  return array;
}
