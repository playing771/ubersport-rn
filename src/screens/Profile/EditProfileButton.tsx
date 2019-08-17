import React from 'react';
import useAuthCheck from '../../hooks/useAuthCheck';
import { Feather } from '@expo/vector-icons';
import withTouch from '../../components/hocs/WIthTouch';
import { StyleSheet } from 'react-native';

interface IProps {}

function EditProfileButton(props: IProps) {
  const { authCheck } = useAuthCheck();
  return authCheck() ? (
    <Feather name="edit" size={20} color="#fff" style={styles.container} />
  ) : null;
}

const styles = StyleSheet.create({
  container: { marginRight: 24 }
});

export default withTouch(EditProfileButton);
