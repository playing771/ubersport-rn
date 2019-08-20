import React, { useEffect } from 'react';
import useAppContext from '../../hooks/useAppContext';
import UserForm from './UserForm';
import UButton from '../../components/UButton';
import { Ionicons } from '@expo/vector-icons';
import Colors, { HEADER_BACKGROUND } from '../../constants/Colors';
import { NavigationScreenProps } from 'react-navigation';
import useNavigation from '../../hooks/useNavigation';

interface IProps extends NavigationScreenProps {}

const EditProfileScreen = (props: IProps) => {
  const { user } = useAppContext();
  const { setParams } = useNavigation();

  useEffect(() => {
    setParams({ test: 'test' });
  }, []);

  return <UserForm id={user.id} />;
};

EditProfileScreen.navigationOptions = ({ navigation }) => {
  const clickHandle = () => {
    navigation.getParam('test');
  };

  return {
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND,
    },
    headerTitleStyle: { color: 'white' },
    headerBackTitleStyle: { color: 'white' },
    headerRight: <HeaderRightButton onPress={clickHandle} />,
  };
};

function HeaderRightButton({ onPress }: { onPress: () => void }) {
  // const { getParam } = useNavigation();

  // const pressHandle = () => {
  // 	console.log('CLICK');

  // 	console.log(getParam('save'));
  // };

  return (
    <UButton
      onPress={onPress}
      // iconStyle={{ width: 20, height: 20 }}
      backgroundColor="transparent"
      style={{ marginRight: 12 }}
    >
      <Ionicons name="ios-log-out" size={30} color={Colors.purle} />
    </UButton>
  );
}

export default EditProfileScreen;
