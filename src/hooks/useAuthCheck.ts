import { NavigationRoot } from '../navigation/roots';
import useAppContext from './useAppContext';
import useNavigation from './useNavigation';

type ICheckType = 'boolean' | 'redirect';

export default function useAuthCheck() {
  const { user, isLoggedIn } = useAppContext();
  const { navigate } = useNavigation();
  // console.log('useAuthCheck', user);

  const authCheck = (checkType: ICheckType = 'boolean') => {
    // console.log('authCheck', checkType);

    if (isLoggedIn) {
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
