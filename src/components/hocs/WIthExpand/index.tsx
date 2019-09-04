import * as React from 'react';

import hoistNonReactStatic from 'hoist-non-react-statics';
import { Optionalize } from '../../../utils/types';
import Expand, { IExpandProps } from '../../Expandable';

interface IWithExpandProps {}

interface IProps extends IExpandProps {}

interface IState {}

const withExpand = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  class ComponentWithAdaptiveScreen extends React.Component<
    Optionalize<T, IWithExpandProps> & IProps,
    IState
  > {
    public static displayName = `withExpand(${displayName})`;
    render() {
      const {
        expanded,
        maxHeight,
        minHeight,
        maxWidth,
        minWidth,
        openDuration,
        closeDuration,
        direction,
        ...rest
      } = this.props;
      return (
        <Expand
          expanded={expanded}
          maxHeight={maxHeight}
          minHeight={minHeight}
          maxWidth={maxWidth}
          minWidth={minWidth}
          openDuration={openDuration}
          closeDuration={closeDuration}
          direction={direction}
        >
          <WrappedComponent {...rest as T} />
        </Expand>
      );
    }
  }
  return hoistNonReactStatic(ComponentWithAdaptiveScreen, WrappedComponent);
};

{
  /* <Expand
          open={this.state.showInput}
          maxHeight={120}
          minHeight={15}
          openDuration={200}
          closeDuration={150}
          direction={ExpandDirection.Vertical}
        >
          <DateInput onChange={() => undefined} onValueSet={() => undefined} />
        </Expand> */
}

export default withExpand;
