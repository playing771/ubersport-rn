import * as React from "react";

export interface ExpanderProps {
  isExpanded: boolean;
  toggleExpanded(): void;
}

export function withExpander<TWrappedComponentProps extends ExpanderProps>(
  WrappedComponent: React.ComponentType<ExpanderProps>
) {
  type WrappedComponentPropsExceptProvided = Exclude<
    keyof TWrappedComponentProps,
    keyof ExpanderProps
  >;
  // => 'title' | 'className'
  type ForwardedProps = Pick<
    TWrappedComponentProps,
    WrappedComponentPropsExceptProvided
  >;
  // => { title: string; className?: string }
  return class WithExpander extends React.Component<
    ForwardedProps,
    { isExpanded: boolean }
  > {
    state = { isExpanded: false };
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          toggleExpanded={this.toggleExpanded}
        />
      );
    }

    private toggleExpanded = () => {
      console.log("TOGGLE", this.state);
      this.setState(state => ({ isExpanded: !state.isExpanded }));
    }
  };
}
