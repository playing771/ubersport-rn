import { useEffect, useState } from 'react';

export default function useStateWithCallback<T>(initialState: T, callback: Function) {
  const [state, setState] = useState(initialState);
  useEffect(() => callback(state), [state]);

  return [state, setState];
}
