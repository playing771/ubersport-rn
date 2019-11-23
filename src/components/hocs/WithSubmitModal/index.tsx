import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import useToggle from '../../../hooks/useToggle';
import { Optionalize } from '../../../utils/types';
import { SubmitModal } from './SubmitModal';

export interface IWithSubmitProps {
  toggleModal: () => void;
}

interface IProps {
  onSubmit: (prop?: any) => void;
  submitText?: string;
  cancelText?: string;
  closeOnSubmi?: boolean;
}

interface IRequiredProps {
  onPress?: any;
}

const withSubmitModal = <T extends IRequiredProps>(WrappedComponent: React.ComponentType<T>) => {
  function ComponentWithSubmit(
    props: Optionalize<T & IWithSubmitProps, IWithSubmitProps> & IProps
  ) {
    const [isVisible, openModal, closeModal] = useToggle();

    return (
      <>
        {isVisible && (
          <SubmitModal
            onSubmit={props.onSubmit}
            closeModal={closeModal}
            submitText={props.submitText}
            cancelText={props.cancelText}
            closeOnSubmit={props.closeOnSubmi}
          />
        )}
        <WrappedComponent
          {...(props as T & Optionalize<T & IWithSubmitProps, IWithSubmitProps> & IProps)}
          onPress={openModal}
        />
      </>
    );
  }
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithSubmit.displayName = `withSubmitModal(${displayName})`;

  return hoistNonReactStatic(ComponentWithSubmit, WrappedComponent);
};

export default withSubmitModal;
