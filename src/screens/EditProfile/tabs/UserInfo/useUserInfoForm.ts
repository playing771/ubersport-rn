import { useEffect, useState } from 'react';
import { IEditProfileUserInfo } from '.';
import useForm from '../../../../hooks/UseForm';

export function useUserInfoForm() {
  const [newInfo, setNewInfo] = useState<IEditProfileUserInfo>();

  const { isValid, setValues } = useForm(newInfo, {
    nickname: 'isRequired',
    lastName: 'isRequired',
  });

  useEffect(() => {
    if (newInfo) {
      setValues(newInfo);
    }
  }, [newInfo]);

  return { newInfo, setNewInfo, isValid };
}
