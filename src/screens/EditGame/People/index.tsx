import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IPickerValue } from '../../../components/Picker/types';
import SingleInput from '../Time/Singlenput';

export interface IRestrictions {
  min: number;
  max: number;
}

interface IProps {
  value?: number;
  onSave: (count: number) => void;
  restrictions: IRestrictions;
}

interface IState {}

export default class EditPeopleCount extends React.PureComponent<
  IProps,
  IState
> {
  count: IPickerValue[] = getItems(this.props.restrictions);

  onCountChange = (value: number | string) => {
    this.props.onSave(Number(value));
  };

  private getValue() {
    if (typeof this.props.value === 'undefined') {
      return Number(this.count[0].value);
    } else {
      return this.props.value;
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <SingleInput
          onChange={this.onCountChange}
          value={this.getValue()}
          list={this.count}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden'
  }
});

function getItems({ min, max }: IRestrictions) {
  const array: IPickerValue[] = Array.from(
    { length: max - min + 2 },
    (v, k) => {
      const item: IPickerValue =
        k > 0
          ? { label: `${k + min}`, value: k + min }
          : { label: 'Без ограничений', value: k };
      return item;
    }
  );
  return array;
}
