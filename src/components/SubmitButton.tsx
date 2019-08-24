import * as React from 'react';

import { Mutation, MutationFn } from 'react-apollo';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ApolloError, OperationVariables } from 'apollo-client';
import UButton from './UButton';
import Colors from '../constants/Colors';
// import {
//   TAB_DEFAULT_HEIGHT,
//   BOTTOM_BIG_NOTCH,
//   BOTTOM_SM_NOTCH
// } from './AdaptiveScreen/index';
// import { isIphoneX } from 'react-native-iphone-x-helper';

type Props = {
  renderBtn?: (
    mutateFn: MutationFn<any, OperationVariables>,
    toggleModal?: (cb?: Function) => void
  ) => JSX.Element;
  onComplete?: (result: any) => void;
  onUpdate?: (cache: any, { data: data }: any) => void;
  onError?: (err: ApolloError) => void;
  refetchQueries?: Array<string>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  gql: object;
  title: string;
  variables: any;
  rounded?: boolean;
  icon?: string;
} & Partial<typeof defaultProps>;

const defaultProps = {
  disabled: false,
  backgroundColor: Colors.green,
};

const defaultstate: State = {};

interface State {}
class SubmitButton extends React.Component<Props, State> {
  static defaultProps = defaultProps;

  state = defaultstate;

  public render() {
    const { variables, refetchQueries, backgroundColor, rounded, icon } = this.props;
    return (
      <Mutation
        mutation={this.props.gql}
        onCompleted={this.props.onComplete}
        onError={this.props.onError}
        update={this.props.onUpdate}
      >
        {(mutate: any, { data, loading, error }: any) => {
          return this.props.renderBtn ? (
            this.props.renderBtn(mutate)
          ) : (
            <UButton
              title={this.props.title}
              onPress={() => mutate({ variables, refetchQueries })}
              style={[styles.container, error ? styles.error : undefined, this.props.style]}
              backgroundColor={backgroundColor}
              textStyle={[styles.title, this.props.textStyle]}
              disabled={this.props.disabled}
              loading={loading}
              icon={icon ? icon : error ? 'ios-close-circle' : undefined}
              rounded={rounded}
            />
          );
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    // bottom:
    //   TAB_DEFAULT_HEIGHT +
    //   (isIphoneX() ? BOTTOM_BIG_NOTCH : BOTTOM_SM_NOTCH) +
    //   10,
    alignSelf: 'center',
  },
  error: {
    backgroundColor: '#f44336',
  },
  title: { color: 'white', fontWeight: '600', fontSize: 16 },
});

export default SubmitButton;
