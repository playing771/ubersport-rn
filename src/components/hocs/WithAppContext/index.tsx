import * as React from 'react';
import { ComponentType } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { AppContextConsumer, AppContext } from '../../../other/context/sports';
import { Optionalize } from '../../../other/types';

interface IInjectedProps {
  ctx?: AppContext;
}

interface IState {}

const withAppContext = <P extends object>(ComponentToAdd: ComponentType<P>) => {
  const displayName =
    ComponentToAdd.displayName || ComponentToAdd.name || 'Component';
  class ComponentwithAppContext extends React.Component<
    Optionalize<P, IInjectedProps> & IInjectedProps,
    IState
  > {
    public static displayName = `withAppContext(${displayName})`;

    render() {
      return (
        <AppContextConsumer>
          {ctx => <ComponentToAdd {...this.props as P} ctx={ctx} />}
        </AppContextConsumer>
      );
    }
  }
  // без any не получается использовать хок в качестве декоратора если в классе есть статическое поле
  return hoistNonReactStatics(ComponentwithAppContext, ComponentToAdd) as any;
};

export default withAppContext;
