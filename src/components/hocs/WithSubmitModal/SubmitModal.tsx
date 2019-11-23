import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';
import shadeBlend from '../../../utils/shadeBlend';

type IProps = {
  // isVisible: boolean;
  closeModal: () => void;
  onSubmit?: (prop?: any) => void;
  onCancel?: () => void;
  closeOnSubmit?: boolean; // для того, чтобы не вызывать стейт у unmounted компонента
} & Partial<typeof defaultProps>;

const defaultProps = {
  submitText: 'Да',
  cancelText: 'Отмена',
  closeOnSubmit: true,
};

export function SubmitModal(props: IProps) {
  return (
    <Modal
      isVisible={true}
      style={s.modalContainer}
      onBackdropPress={props.closeModal}
      backdropTransitionOutTiming={0} // stops modal "flickering", https://github.com/react-native-community/react-native-modal/issues/268#issuecomment-493464419
    >
      <View style={s.modalContent}>
        <TouchableHighlight
          onPress={prop => {
            if (props.onSubmit) {
              if (props.closeOnSubmit) {
                props.closeModal();
              }
              props.onSubmit(prop);
            }
          }}
          style={s.submitBtn}
          underlayColor={shadeBlend(-0.1, '#EFEFED')}
        >
          <Text style={s.submitText}>{props.submitText}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            props.closeModal();

            if (typeof props.onCancel !== 'undefined') {
              props.onCancel();
            }
          }}
          style={s.cancelBtn}
          underlayColor={shadeBlend(-0.1, '#FCFCFC')}
        >
          <Text style={s.cancelText}>{props.cancelText}</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  modalContainer: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  submitBtn: {
    backgroundColor: '#EFEFED',
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitText: { color: '#F84472', textAlign: 'center' },
  cancelBtn: {
    backgroundColor: '#FCFCFC',
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: { color: '#4B7AEA', textAlign: 'center' },
});

SubmitModal.defaultProps = defaultProps;
