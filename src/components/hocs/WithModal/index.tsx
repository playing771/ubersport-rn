import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import useToggle from '../../../hooks/useToggle';
import { Optionalize } from '../../../utils/types';
import DefaultModal from './defaultModal';

const defaultAnimations = { in: 'fadeIn', out: 'fadeOut' };

export interface IWithModalProps {
  toggleModal: () => void;
}

interface IRequiredProps {
  onPress?: (e: any) => void;
}

interface IProps {
  modal?: (api: { closeModal: () => void }) => JSX.Element;
  animationIn?: any;
  animationOut?: any;
  modalStyle?: StyleProp<ViewStyle>;
}

export const withModal = <T extends IRequiredProps>(WrappedComponent: React.ComponentType<T>) => {
  function ComponentWithModal(props: Optionalize<T & IWithModalProps, IWithModalProps> & IProps) {
    const [isVisible, openModal, closeModal] = useToggle();

    function getApi() {
      return {
        closeModal,
      };
    }

    return (
      <>
        <Modal
          isVisible={isVisible}
          style={[s.modalContainer, props.modalStyle]}
          onBackdropPress={closeModal}
          animationIn={props.animationIn}
          animationOut={props.animationOut}
          backdropTransitionOutTiming={0} // stops modal "flickering", https://github.com/react-native-community/react-native-modal/issues/268#issuecomment-493464419
        >
          {props.modal ? props.modal(getApi()) : <DefaultModal />}
        </Modal>
        <WrappedComponent
          {...(props as T & Optionalize<T & IWithModalProps, IWithModalProps> & IProps)}
          onPress={openModal}
        />
      </>
    );
  }
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithModal.displayName = `withModal(${displayName})`;

  ComponentWithModal.defaultProps = {
    animationIn: defaultAnimations.in,
    animationOut: defaultAnimations.out,
  };
  return hoistNonReactStatic(ComponentWithModal, WrappedComponent);
};

const s = StyleSheet.create({
  modalContainer: { justifyContent: 'center', margin: 30 },
});
