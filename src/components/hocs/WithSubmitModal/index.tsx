import * as React from 'react';
import SubmitModal from './SubmitModal';
import { Optionalize } from '../../../other/types';
import hoistNonReactStatic from 'hoist-non-react-statics';

export type IWithSubmitProps = {
  toggleModal: () => void;
};

type IProps = {
  onSubmit: (prop?: any) => void;
  submitText?: string;
  cancelText?: string;
  closeOnSubmi?: boolean;
};

interface IRequiredProps {
  onPress?: any;
}

interface IState {
  isVisible: boolean;
}

const withSubmitModal = <T extends IRequiredProps>(WrappedComponent: React.ComponentType<T>) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  class ComponentWithSubmit extends React.Component<
    Optionalize<T & IWithSubmitProps, IWithSubmitProps> & IProps,
    IState
  > {
    public static displayName = `withSubmitModal(${displayName})`;

    state = {
      isVisible: false,
    };

    toggleModal = (): Promise<void> => {
      return new Promise(resolve => {
        this.setState({ isVisible: !this.state.isVisible }, () => resolve());
      });
    };

    render() {
      return (
        <>
          <SubmitModal
            isVisible={this.state.isVisible}
            onSubmit={this.props.onSubmit}
            toggleModal={this.toggleModal}
            submitText={this.props.submitText}
            cancelText={this.props.cancelText}
            closeOnSubmit={this.props.closeOnSubmi}
          />
          <WrappedComponent
            {...(this.props as T & Optionalize<T & IWithSubmitProps, IWithSubmitProps> & IProps)}
            onPress={this.toggleModal}
          />
        </>
      );
    }
  }
  return hoistNonReactStatic(ComponentWithSubmit, WrappedComponent);
};

export default withSubmitModal;
