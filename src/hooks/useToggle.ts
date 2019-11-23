import { Dispatch, useState } from 'react';

type IUseToggleTurple = [boolean, () => void, () => void, Dispatch<React.SetStateAction<boolean>>];

export default function useToggle(initialState: boolean = false): IUseToggleTurple {
  const [isActive, setActive] = useState<boolean>(initialState);

  const activate = () => setActive(true);
  const deactivate = () => setActive(false);

  return [isActive, activate, deactivate, setActive];
}
