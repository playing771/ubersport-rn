import { useEffect, useState } from 'react';
import { IEditProfileUserInfo } from '.';
import useForm from '../../../../hooks/UseForm';

const validation = {
  nickname: 'isRequired',
};

export function useUserInfoForm() {
  const [newInfo, setNewInfo] = useState<IEditProfileUserInfo>();

  const { isValid, setValues } = useForm(newInfo, validation);

  useEffect(() => {
    if (newInfo) {
      setValues(newInfo);
    }
  }, [newInfo]);

  return { newInfo, setNewInfo, isValid };
}
