import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import { IPassedStepInjectedProps } from '../../../components/UWizard/index';
import PassedItemContainer from '../PassedItemContainer';

interface IProps extends IPassedStepInjectedProps {
  data: { login: string; lastName: string; name: string };
}

const UserInfoPassed = ({ data, toggleActiveStep, index }: IProps) => {
  return (
    <>
      <AnimatedView
        animation="fadeIn"
        duration={1100}
        useNativeDriver={true}
        style={[styles.titleContainer]}
      >
        <Text style={styles.mainText}>
          Пожалуйста, укажите дополнительную информацию о себе
        </Text>
      </AnimatedView>
      <AnimatedView
        animation="fadeIn"
        useNativeDriver={true}
        duration={1100}
        delay={500}
      >
        <PassedItemContainer
          index={index}
          onPressHandle={toggleActiveStep}
          text={getInfoText(data)}
        />
      </AnimatedView>
    </>
  );
};

function getInfoText({
  login,
  lastName,
  name
}: {
  login: string;
  lastName: string;
  name: string;
}) {
  return `${lastName} ${name}, ${login}`;
}

const styles = StyleSheet.create({
  titleContainer: {
    // backgroundColor: 'white',
    backgroundColor: '#505B77',
    padding: 16,
    borderRadius: 14,
    borderBottomLeftRadius: 0,
    // flex: 1,
    marginLeft: 12,
    width: '80%'
  },
  mainText: { color: 'white', fontWeight: '600', fontSize: 16 },
  subText: { color: '#CBD6F2', marginTop: 6 },
  userInfoContainer: {
    backgroundColor: '#1C2F5E'
  }
});

export default UserInfoPassed;
