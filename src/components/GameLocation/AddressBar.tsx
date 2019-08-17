import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';

// const defaultText = 'Выберите место проведения';

interface IProps {
  address: string;
  loading: boolean;
}

interface IState {}

class AddressBar extends React.PureComponent<IProps, IState> {
  textRef = React.createRef<any>();

  componentDidMount() {
    this.textRef.current!.transition({ opacity: 0 }, { opacity: 1 }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animatable.Text ref={this.textRef} style={styles.text}>
          {this.props.address}
        </Animatable.Text>
        {this.props.loading && <ActivityIndicator size="large" />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 34,
    width: '100%',
    position: 'absolute',
    top: 90,
    zIndex: 999
  },
  text: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center'
  }
});

export default AddressBar;
