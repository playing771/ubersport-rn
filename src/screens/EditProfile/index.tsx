import React from 'react';
import useAppContext from '../../hooks/useAppContext';
import UserForm from './UserForm';
import UButton from '../../components/UButton';
import { Ionicons } from '@expo/vector-icons';
import Colors, { HEADER_BACKGROUND } from '../../constants/Colors';

interface IProps {}

export default function EditProfileScreen(props: IProps) {
  const { user } = useAppContext();
  // console.log('USER', user);

  return <UserForm id={user.id} />;
}

EditProfileScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: HEADER_BACKGROUND
  },
  headerTitleStyle: { color: 'white' },
  headerBackTitleStyle: { color: 'white' },
  headerRight: (
    <UButton
      onPress={() => alert('This is a button!')}
      // iconStyle={{ width: 20, height: 20 }}
      backgroundColor="transparent"
      style={{ marginRight: 12 }}
    >
      <Ionicons name="ios-log-out" size={30} color={Colors.purle} />
    </UButton>
  )
};
