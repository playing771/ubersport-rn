import * as React from 'react';

export interface CounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterState {
  value: number;
}

const withIncrement = <P extends CounterProps>(
  WrappedComponent: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    Exclude<P, CounterProps>,
    MakeCounterState
  > {
    state: MakeCounterState = {
      value: 0
    };

    increment = () => {
      console.log('increment');
      this.setState(prevState => ({
        value: prevState.value + 1
      }));
    }

    decrement = () => {
      console.log('decrement');
      this.setState(prevState => ({
        value: prevState.value - 1
      }));
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };

export default withIncrement;
