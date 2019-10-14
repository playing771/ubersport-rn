import React, { ReactElement, ElementType } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import EditTimeItemForm from './Form';
import withTouch from '../../../components/hocs/WIthTouch';

interface IProps {
  label: string | ReactElement;
  icon: string;
  extra?: string;
  renderInput?: (api: API) => JSX.Element;
  onPress?: () => void;
  style?: ViewStyle;
  touchable?: boolean;
  // onChange: (value: number) => void;
}

interface IState {
  expanded: boolean;
  // pickerValue: number;
}

type API = ReturnType<EditableDateItem['getApi']>;

class EditableDateItem extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    touchable: true,
  };

  itemElement: ElementType;

  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { expanded: false };
  }

  toggleInput = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  private getApi() {
    return {
      expanded: this.state.expanded,
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <EditTimeItemForm
          label={this.props.label}
          icon={this.props.icon}
          extra={this.props.extra}
          disabled={!this.props.touchable}
          onPress={this.props.onPress ? this.props.onPress : this.toggleInput}
        />
        {this.props.renderInput && this.props.renderInput(this.getApi())}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'column', overflow: 'hidden' },
});

export default EditableDateItem;
