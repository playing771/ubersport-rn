import * as React from 'react';
import { StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import UPickerGroup from '../../../components/Picker';
import PickerPart from '../../../components/Picker/PickerPart';
import { IPickerValue } from '../../../components/Picker/types';

interface IProps extends IStyleProps {
  onChange: (value: number | string) => void;
  value: number;
  list: IPickerValue[];
}

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

interface IState {}

class SingleInput extends React.PureComponent<IProps, IState> {
  public render() {
    return (
      <UPickerGroup>
        <PickerPart
          items={this.props.list}
          onChange={this.props.onChange}
          selected={this.props.value}
          style={styles.pickerPart}
          itemStyle={styles.pickerPartItem}
        />
      </UPickerGroup>
    );
  }
}

const styles = StyleSheet.create({
  pickerPartItem: { color: '#8890A7', fontSize: 16 },
  pickerPart: { flex: 1, marginTop: 15 }
});

export default SingleInput;
