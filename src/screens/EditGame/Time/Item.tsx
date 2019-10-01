import  React, { ReactElement } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import EditTimeItemForm from './Form';

interface IProps {
  label: string | ReactElement;
  icon: string;
  extra?: string;
  renderInput?: (api: API) => JSX.Element;
  onPress?: () => void;
  style?: ViewStyle;
  // onChange: (value: number) => void;
}

interface IState {
  expanded: boolean;
  // pickerValue: number;
}

type API = ReturnType<EditTimeItem['getApi']>;

class EditTimeItem extends React.PureComponent<IProps, IState> {
  state = { expanded: false };

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
          onPress={this.props.onPress ? this.props.onPress : this.toggleInput}
        />
        {this.props.renderInput && this.props.renderInput(this.getApi())}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'column', overflow: 'hidden'},
});

export default EditTimeItem;
