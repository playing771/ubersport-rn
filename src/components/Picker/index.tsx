import * as React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import UPickerPart from './PickerPart';

const defaultProps = {
  valueSelector: true
};

interface IProps {
  style?: StyleProp<ViewStyle>;
  // onChange: (value: number) => void;
  valueSelector: boolean;
}

class UPickerGroup extends React.Component<IProps> {
  static defaultProps = defaultProps;
  static Part = UPickerPart; // TODO: увязать вместе с defaultProps

  public render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {/* {this.props.valueSelector && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: '40%',
              height: 40,
              width: '100%',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.3)'
            }}
          />
        )} */}
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative'
  }
});

export default UPickerGroup;
