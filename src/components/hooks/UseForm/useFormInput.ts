import { useEffect, useState } from 'react';
import { EmptyCallbackFn, ErrorCallbackFn, formUtils } from './utils';

export function useFormInput<T = any>(
  name: string,
  formHandler: [any, any],
  validation: string = '',
  handleError: ErrorCallbackFn,
  callback?: EmptyCallbackFn
) {
  const [formData, setFormData] = formHandler;
  const formValue = formData[name] || '';

  const [value, setValue] = useState<T>(formValue);

  // watch for external parent data changes in self
  useEffect(() => {
    if (value !== formValue) {
      setValue(formValue);
      // setIsTouched(false);
      // setIsFocused(false);
    }
  }, [formValue]);

  // initial validation
  useEffect(() => {
    handleValidation(value);
  }, []);

  // validate on value change
  // useEffect(() => {
  //   handleValidation(value);
  // }, [value]);

  function handleValidation(valueToValidate: T) {
    const unmetRule = formUtils.validate(valueToValidate, validation);

    handleError(name, unmetRule);
  }

  // rewrite self and parent's value
  function onChangeText(text: T) {
    handleValidation(text);
    setValue(value);
    setFormData({
      ...formData,
      [name]: text,
    });

    if (callback) {
      callback();
    }
  }

  return { onChangeText };
}
