import { ApolloError } from 'apollo-client';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import handleApoloError from '../../utils/handleApoloError';
import Card from '../GeneralCard/index';

export type IErrorCardPosition = 'TOP' | 'BOTTOM' | 'CENTER';

interface IDefaultProps {
  gapped: boolean;
  show: true;
}

interface INonDefaultProps {
  error?: string | ApolloError;
  position?: IErrorCardPosition;
}

export interface IProps extends IDefaultProps, INonDefaultProps {}

export type IErrorCardProps = INonDefaultProps & Partial<IDefaultProps>;

const defaultProps: IDefaultProps = {
  gapped: true,
  show: true,
};

const ErrorCard = ({ error, show, position, gapped }: IProps) => {
  const [visible, toggle] = useState(true);

  const hide = () => {
    toggle(false);
  };

  useEffect(() => {
    toggle(show);
  }, [show]);

  return visible && show && error ? (
    <AnimatedView
      animation="fadeIn"
      duration={300}
      style={[getContainerPosition(position)]}
      useNativeDriver={true}
    >
      <Card
        wrapperStyle={[styles.card, gapped ? styles.gapped : styles.fullWidth]}
        styles={styles.innerCardStyle}
        onPress={hide}
      >
        <>
          <Text style={styles.textMain}>Ошибка</Text>
          <Text style={styles.textSub}>
            {isApoloError(error) ? handleApoloError(error) : error}
          </Text>
        </>
      </Card>
    </AnimatedView>
  ) : (
    <></>
  );
};

ErrorCard.defaultProps = defaultProps;

function getContainerPosition(position?: IErrorCardPosition) {
  switch (position) {
    case 'TOP':
      return { marginBottom: 'auto' };
    case 'CENTER':
      return { marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto' };
    case 'BOTTOM':
      return {
        marginTop: 'auto',
      };
    default:
      return undefined;
  }
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    backgroundColor: '#ff5722',
    padding: 18,
    borderRadius: 8,
    marginVertical: 12,
  },
  fullWidth: { width: '100%' },
  gapped: { width: '95%' },
  innerCardStyle: { flex: 0, minHeight: 50 },
  textMain: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 6,
  },
  textSub: { color: '#f3eded', fontSize: 14 },
});

export default ErrorCard;

function isApoloError(error: string | ApolloError): error is ApolloError {
  return typeof error !== 'string';
}
