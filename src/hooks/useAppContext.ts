import { useContext } from 'react';
import { AppContext, uknonwUser } from '../other/context/sports';
import { AsyncStorage } from 'react-native';

export default function useAppContext() {
  const { setUser, user } = useContext(AppContext);

  const isLoggedIn = user.id !== 'noId';

  const logout = () => {
    setUser(uknonwUser);
    AsyncStorage.clear();
  };

  return { setUser, user, isLoggedIn, logout };
}
