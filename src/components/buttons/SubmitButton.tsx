import { ApolloError } from 'apollo-client';
import { DocumentNode } from 'graphql';
import React from 'react';
import { useMutation } from 'react-apollo';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Colors from '../../constants/Colors';
import UButton from './UButton';

interface IProps {
  renderBtn?: (mutateFn: any, toggleModal?: (cb?: Function) => void) => JSX.Element;
  onComplete?: (result: any) => void;
  // onUpdate?: (cache: any, { data: data }: any) => void;
  onError?: (err: ApolloError) => void;
  refetchQueries?: string[];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  gql: DocumentNode;
  title: string;
  variables: any;
  rounded?: boolean;
  icon?: string;
  onPress?: () => void;
  disabled?: boolean;
}

interface IDefaultProps {
  backgroundColor: string;
}

const defaultProps: IDefaultProps = {
  backgroundColor: Colors.green,
};

export function SubmitButton(props: IProps) {
  const {
    variables,
    refetchQueries,
    backgroundColor,
    rounded,
    icon,
    onPress,
    onError,
    onComplete,
  } = props;
  const [mutate, { loading, error, data }] = useMutation(props.gql);

  if (error && onError) {
    onError(error);
  }

  if (data && onComplete) {
    onComplete(data);
  }

  function handleClick() {
    if (onPress && !loading) {
      onPress();
    } else {
      mutate({ variables, refetchQueries });
    }
  }

  return props.renderBtn ? (
    props.renderBtn(mutate)
  ) : (
    <UButton
      title={props.title}
      onPress={handleClick}
      style={[styles.container, error ? styles.error : undefined, props.style]}
      backgroundColor={backgroundColor}
      textStyle={[styles.title, props.textStyle]}
      disabled={props.disabled}
      loading={loading}
      loadingIndicatorColor="white"
      icon={icon ? icon : error ? 'ios-close-circle' : undefined}
      rounded={rounded}
    />
  );
}

SubmitButton.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: 50,
    // position: 'absolute',
    // bottom: 0,
    // bottom:
    //   TAB_DEFAULT_HEIGHT +
    //   (isIphoneX() ? BOTTOM_BIG_NOTCH : BOTTOM_SM_NOTCH) +
    //   10,
    // alignSelf: 'center',
  },
  error: {
    backgroundColor: '#f44336',
  },
  title: { color: 'white', fontWeight: '600', fontSize: 16 },
});
