import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import CardHeader from './Header';
import CardContent from './Content';
import withTouch from '../hocs/WIthTouch';

type IProps = {
  children?: React.ReactChild | React.ReactChild[];
  name?: string;
  id?: string;
  description?: string;
  header?: JSX.Element;
  renderContent?(): JSX.Element;
} & Partial<typeof defaultProps>;

const defaultProps = {
  headerBgColor: 'white',
};

const Card = withTouch<IProps>(props => {
  return (
    <View style={styles.container}>
      {props.header && <CardHeader bgColor={props.headerBgColor}>{props.header}</CardHeader>}
      <CardContent>
        {props.renderContent && props.renderContent()}
        {React.Children.map(props.children, child => {
          if (child) {
            return child;
          }
          return;
        })}
      </CardContent>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { elevation: 50, flex: 1 },
});

(Card as any).defaultProps = defaultProps;

export default Card;
