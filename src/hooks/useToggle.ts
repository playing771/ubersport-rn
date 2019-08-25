import { useState } from 'react';

export default function useToggle(initialState: boolean = false) {
  const [isActive, setActive] = useState<boolean>(initialState);

  const activate = () => setActive(true);
  const deactivate = () => setActive(false);

  return {
    isActive,
    activate,
    deactivate,
    toggle: setActive,
  };
}
