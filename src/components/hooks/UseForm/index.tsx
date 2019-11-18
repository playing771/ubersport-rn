import { useEffect, useState } from 'react';
import { useFormInput } from './useFormInput';
import { EmptyCallbackFn } from './utils';

interface IFormDataMap {
  [key: string]: string;
}

export default function useForm(initialValues: IFormDataMap = {}) {
  const formHandler = useState(initialValues);
  const errorHandler = useState<IFormDataMap>({});

  const [isMounted, setMounted] = useState(false);
  const [values, setValues] = formHandler;
  const [errors, setErrors] = errorHandler;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleError = (name: string, unmetRule: any) => {
    if (!unmetRule) {
      delete errors[name]; // TODO: change delete
    } else {
      errors[name] = unmetRule;
    }
    setErrors(errors); // TODO: null if empty
  };

  const useTextInput = <T extends unknown = any>(
    name: string,
    validation: string,
    callback?: EmptyCallbackFn
  ) => useFormInput<T>(name, formHandler, validation, handleError, callback);

  const isValid = isMounted && !Object.values(errors).length;

  return {
    values,
    errors,
    setValues,
    useTextInput,
    isValid,
  };
}
