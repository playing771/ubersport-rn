import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import useAppContext from '../../hooks/useAppContext';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import withSubmitModal from '../../components/hocs/WithSubmitModal';
import UButton from '../../components/buttons/UButton';
import Colors from '../../constants/Colors';

export default function HeaderRightButton() {
  const { isLoggedIn, logout } = useAppContext();
  const { navigate } = useNavigation();

  const pressHandle = () => {
    navigate(NavigationRoot.NotAuthorized);
    logout();
  };

  return (
    isLoggedIn && (
      <WithModalButton
        backgroundColor="transparent"
        style={styles.button}
        textStyle={styles.buttonText}
        onSubmit={pressHandle}
      >
        <Ionicons name="ios-log-out" size={30} color={Colors.purle} />
      </WithModalButton>
    )
  );
}

const WithModalButton = withSubmitModal(UButton);

const styles = StyleSheet.create({
  button: { marginRight: 12 },
  buttonText: { fontSize: 14 },
});
