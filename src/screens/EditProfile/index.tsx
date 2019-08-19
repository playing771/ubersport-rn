import React from 'react';
import useAppContext from '../../hooks/useAppContext';
import UserForm from './UserForm';
import UButton from '../../components/UButton';
import { Ionicons } from '@expo/vector-icons';
import Colors, { HEADER_BACKGROUND } from '../../constants/Colors';
import useNavigation from '../../hooks/useNavigation';
import { withNavigation, NavigationScreenProps } from 'react-navigation';

interface IProps extends NavigationScreenProps {}

const EditProfileScreen = (props: IProps) => {
  const { user } = useAppContext();
  // const { setParams } = useNavigation();
  // console.log('USER', user);
  console.log('SETPARMAS');
  console.log(' props.navigation', props.navigation);

  // props.navigation.setParams({ test: 'test' });
  // setParams({ save: () => undefined });

  // return <UserForm id={user.id} />;
  return null;
};

EditProfileScreen.navigationOptions = props => {
  // console.log('props', props);
  // console.log(props.navigation.getParam('test'));

  return {
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND,
    },
    headerTitleStyle: { color: 'white' },
    headerBackTitleStyle: { color: 'white' },
    headerRight: <HeaderRightButton />,
  };
};

function HeaderRightButton() {
  // const { getParam } = useNavigation();

  // const pressHandle = () => {
  // 	console.log('CLICK');

  // 	console.log(getParam('save'));
  // };
  console.log('HeaderRightButton');

  return (
    <UButton
      onPress={() => console.log('CLICK')}
      // iconStyle={{ width: 20, height: 20 }}
      backgroundColor="transparent"
      style={{ marginRight: 12 }}
    >
      <Ionicons name="ios-log-out" size={30} color={Colors.purle} />
    </UButton>
  );
}

export default withNavigation(EditProfileScreen);
