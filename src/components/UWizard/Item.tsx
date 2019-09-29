import React, { ReactNode, ReactElement } from 'react';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import UButton from '../buttons/UButton';
import Colors from '../../constants/Colors';
import { ApolloConsumer } from 'react-apollo';

interface IProps {
  children: ReactNode;
  toggleActiveStep: (activeStep: number) => void;
  completeWizardHandle?: (
    mutate: (mutation: any) => Promise<any>
  ) => // e: GestureResponderEvent,
  // onClickId?: string | undefined
  void;
  index: number;
  isLast?: boolean;
  withControls?: boolean;
  disabledControls?: boolean;
}

const UWizardItem = ({
  children,
  toggleActiveStep,
  index,
  withControls,
  isLast,
  completeWizardHandle,
  disabledControls
}: IProps) => {
  return (
    <View>
      {children}
      {withControls && isLast ? (
        <ApolloConsumer>
          {client => (
            <UButton
              title="Завершить"
              style={styles.submitButton}
              backgroundColor={Colors.green}
              textStyle={styles.submitButtonTitle}
              onPress={() => {
                if (completeWizardHandle) {
                  completeWizardHandle(client.mutate);
                }
              }}
              disabled={disabledControls}
            />
          )}
        </ApolloConsumer>
      ) : withControls ? (
        <UButton
          title="Продолжить"
          style={styles.submitButton}
          backgroundColor={Colors.green}
          textStyle={styles.submitButtonTitle}
          onPress={() => toggleActiveStep(index)}
          disabled={disabledControls}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 12,
    height: 42,
    borderRadius: 6,
    marginBottom: 60
  },
  submitButtonTitle: { fontSize: 16, fontWeight: '500' }
});

export default UWizardItem;
