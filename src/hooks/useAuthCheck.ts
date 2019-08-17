import useAppContext from './useAppContext';
import { NavigationRoot } from '../navigation/roots';
import useNavigation from './useNavigation';

type ICheckType = 'boolean' | 'redirect';

export default function useAuthCheck() {
  const { user } = useAppContext();
  const { navigate, replace } = useNavigation();
  console.log('useAuthCheck', user);

  const authCheck = (checkType: ICheckType = 'boolean') => {
    console.log('authCheck', checkType);

    if (user.id !== 'noId') {
      return true;
    }

    if (checkType === 'redirect') {
      console.log('REDIRECT');
      // replace(NavigationRoot.NotAuthorized);
      navigate(NavigationRoot.NotAuthorized);
    }

    return false;
  };

  return { authCheck };
}
