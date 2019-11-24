import { NavigationRoot } from '../navigation/roots';
import useAppContext from './useAppContext';
import useNavigation from './useNavigation';

type ICheckType = 'boolean' | 'redirect';

export default function useAuthCheck() {
  const { user, isLoggedIn } = useAppContext();
  const navigation = useNavigation();
  console.log('useAuthCheck', isLoggedIn);

  const authCheck = (checkType: ICheckType = 'boolean') => {
    // console.log('authCheck', checkType);

    if (isLoggedIn) {
      return true;
    }

    if (checkType === 'redirect') {
      // в тайпингах нет replace
      (navigation as any).replace(NavigationRoot.NotAuthorized, {}, {});
    }

    return false;
  };

  return { authCheck, isLoggedIn };
}
