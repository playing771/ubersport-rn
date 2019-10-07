import * as React from 'react';
import { Optionalize } from '../../../utils/types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Modal from 'react-native-modal';
import DefaultModal from './defaultModal';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';

const defaultAnimations = { in: 'fadeIn', out: 'fadeOut' };

export type IWithModalProps = {
  toggleModal: () => void;
};

interface IRequiredProps {
  onPress?: (e: any) => void;
}

type IProps = {
  modal?: (api: { toggleModal: () => void }) => JSX.Element;
  animationIn?: any;
  animationOut?: any;
  modalStyle?: StyleProp<ViewStyle>;
};

interface IState {
  isVisible: boolean;
}

const withModal = <T extends IRequiredProps>(WrappedComponent: React.ComponentType<T>) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  class ComponentWithModal extends React.Component<
    Optionalize<T & IWithModalProps, IWithModalProps> & IProps,
    IState
  > {
    public static displayName = `withModal(${displayName})`;

    static defaultProps = {
      animationIn: defaultAnimations.in,
      animationOut: defaultAnimations.out,
    };

    state = {
      isVisible: false,
    };

    toggleModal = () => {
      this.setState({ isVisible: !this.state.isVisible });
    };

    private getApi() {
      return {
        toggleModal: this.toggleModal,
      };
    }

    render() {
      return (
        <>
          <Modal
            isVisible={this.state.isVisible}
            style={[s.modalContainer, this.props.modalStyle]}
            onBackdropPress={this.toggleModal}
            animationIn={this.props.animationIn}
            animationOut={this.props.animationOut}
            backdropTransitionOutTiming={0} // stops modal "flickering", https://github.com/react-native-community/react-native-modal/issues/268#issuecomment-493464419
          >
            {this.props.modal ? this.props.modal(this.getApi()) : <DefaultModal />}
          </Modal>
          <WrappedComponent
            {...(this.props as T & Optionalize<T & IWithModalProps, IWithModalProps> & IProps)}
            onPress={this.toggleModal}
          />
        </>
      );
    }
  }
  return hoistNonReactStatic(ComponentWithModal, WrappedComponent);
};

const s = StyleSheet.create({
  modalContainer: { justifyContent: 'center', margin: 30 },
});

export default withModal;
