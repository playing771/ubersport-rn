import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import EditTimeItemForm from './Form';

interface IProps {
  label: string;
  icon: string;
  extra?: string;
  renderInput: (api: API) => JSX.Element;
  // onChange: (value: number) => void;
}

interface IState {
  expanded: boolean;
  // pickerValue: number;
}

type API = ReturnType<EditTimeItem['getApi']>;

class EditTimeItem extends React.PureComponent<IProps, IState> {
  state = { expanded: false };

  // componentDidMount() {
  //   this.props.onChange(this.dates[Number(this.state.pickerValue)].label); // чтобы установить лебел с датой в комоненте родителе
  // }

  toggleInput = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  private getApi() {
    return {
      expanded: this.state.expanded
    };
  }

  // pickerChange = (value: number | string) => {
  //   this.props.onChange(Number(value));
  //   // this.setState({ pickerValue: Number(value) }, () => {
  //   //   this.props.onChange(this.dates[Number(value)].label);
  //   // });
  // }

  render() {
    return (
      <View style={styles.container}>
        <EditTimeItemForm
          label={this.props.label}
          icon={this.props.icon}
          extra={this.props.extra}
          onPress={this.toggleInput}
        />
        {this.props.renderInput(this.getApi())}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'column', overflow: 'hidden' },
  fakePaddingContainer: { paddingVertical: 7 }
});

export default EditTimeItem;
