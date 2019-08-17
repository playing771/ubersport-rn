import * as React from 'react';
import Modal from 'react-native-modal';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import shadeBlend from '../../../other/shadeBlend';

type IProps = {
  isVisible: boolean;
  toggleModal: () => Promise<void>;
  onSubmit?: (prop?: any) => void;
  onCancel?: () => void;
  closeOnSubmit?: boolean; // для того, чтобы не вызывать стейт у unmounted компонента
} & Partial<typeof defaultProps>;

const defaultProps = {
  submitText: 'Да',
  cancelText: 'Отмена',
  closeOnSubmit: true
};

const SubmitModal = (props: IProps) => {
  return (
    <Modal
      isVisible={props.isVisible}
      style={s.modalContainer}
      onBackdropPress={props.toggleModal}
    >
      <View style={s.modalContent}>
        <TouchableHighlight
          onPress={prop => {
            if (props.onSubmit) {
              console.log('props.closeOnSubmit', props.closeOnSubmit);

              if (props.closeOnSubmit) {
                console.log('closing');
                props.toggleModal();
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
            props.toggleModal();
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
};

const s = StyleSheet.create({
  modalContainer: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  submitBtn: {
    backgroundColor: '#EFEFED',
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  submitText: { color: '#F84472', textAlign: 'center' },
  cancelBtn: {
    backgroundColor: '#FCFCFC',
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  cancelText: { color: '#4B7AEA', textAlign: 'center' }
});

SubmitModal.defaultProps = defaultProps;

export default SubmitModal;
