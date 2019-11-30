import { useEffect, useState } from 'react';
import { ObjectMap, SimpleCallback } from '../../utils/types';
import { useFormInput } from './useFormInput';
import { formUtils } from './utils';

type ErrorsMap = ObjectMap<string | null>;
// provide validationMap only if useTextInput is not used
export default function useForm(initialValues: ObjectMap = {}, validationMap?: ObjectMap<string>) {
  const formHandler = useState<ObjectMap>(initialValues);
  const errorHandler = useState<ErrorsMap>({});

  const [isMounted, setMounted] = useState(false);
  const [values, setValues] = formHandler;
  const [errors, setErrors] = errorHandler;
  // console.log('useForm');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleError = (name: string, unmetRule: any) => {
    const erorrsCopy: ErrorsMap = Object.assign({}, errors);

    if (!unmetRule) {
      erorrsCopy[name] = null;
    } else {
      erorrsCopy[name] = unmetRule;
    }

    setErrors(erorrsCopy); // TODO: null if empty
  };

  useEffect(() => {
    // validate if validationMap is provided
    if (validationMap) {
      const unmetRules = Object.keys(values).reduce<ErrorsMap>((unmetRulesMap, name) => {
        const unmetRule = formUtils.validate(values[name], validationMap[name]);

        unmetRulesMap[name] = unmetRule;

        return unmetRulesMap;
      }, {});

      setErrors(unmetRules);
    }
  }, [values, validationMap]);

  const useTextInput = <T extends unknown = any>(
    name: string,
    validation: string,
    callback?: SimpleCallback
  ) => useFormInput<T>(name, formHandler, validation, handleError, callback);

  const isValid = isMounted && !Object.values(errors).some(err => err !== null);

  return {
    values,
    errors,
    setValues,
    useTextInput,
    isValid,
  };
}
