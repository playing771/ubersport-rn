import { useContext } from 'react';
import { AppContext } from '../other/context/sports';

export default function useAppContext() {
  return useContext(AppContext);
}
