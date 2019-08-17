import { useState, useEffect } from 'react';
import * as validator from 'validator';

export function validate(value: any, validation: any) {
  const fieldsToValidate: any = {};
  let trimmedValidation: string;

  switch (typeof validation) {
    case 'object':
      Object.keys(validation).forEach(property => {
        fieldsToValidate[property] = validation[property];
      });
      break;

    case 'string':
    default:
      if (!validation.length) return null;

      trimmedValidation = validation.replace(/ /g, '');
      trimmedValidation.split(',').forEach(fieldName => {
        fieldsToValidate[fieldName.trim()] = true;
      });
  }

  // check whether we do need to validate at all
  const isRequired =
    fieldsToValidate.isRequired || fieldsToValidate.isEmpty === false;
  if (!value && !isRequired) return null;

  let unmetValidationRule = null;
  let isValid = true;

  Object.keys(fieldsToValidate).forEach((rule: any) => {
    // don't proceed if we're already invalid
    if (!isValid) return;

    const options = fieldsToValidate[rule];

    switch (rule) {
      case 'isRequired':
        if (!value) isValid = false;
        break;

      default:
        switch (options) {
          case true:
          case null:
            isValid = (validator as any)[rule](value);
            break;
          case false:
            isValid = !(validator as any)[rule](value);
            break;
          default:
            isValid = (validator as any)[rule](value, options);
        }
    }

    if (!isValid) unmetValidationRule = rule;
  });

  return unmetValidationRule || null;
}

function useFormInput(
  name: string,
  formHandler: any,
  validation = '',
  handleError: Function,
  callback?: Function
) {
  const [formData, setFormData] = formHandler;
  const formValue = formData[name] || '';

  const [value, setValue] = useState(formValue);
  const [isValid, setIsValid] = useState(true);

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
  useEffect(() => {
    handleValidation(value);
  }, [value]);

  function handleValidation(value: any) {
    const unmetRule = validate(value, validation);
    setIsValid(!unmetRule);
    handleError(name, unmetRule);
  }

  // rewrite self and parent's value
  function handleChange(text: string) {
    // let { value } = target;
    setValue(value);
    setFormData({
      ...formData,
      [name]: text
    });
    if (callback) {
      callback();
    }
  }

  return { name, value, onChangeText: handleChange };
}

export default function useForm(initialValues: { [key: string]: string }) {
  const formHandler = useState(initialValues);
  const errorHandler = useState({});

  const [mounted, setMounted] = useState(false);

  const [values, setValues] = formHandler;
  const [errors, setErrors] = errorHandler;

  // initial mounted flag
  useEffect(() => setMounted(true), []);

  const handleError = (name: string, unmetRule: any) => {
    if (!unmetRule) delete (errors as any)[name];
    else (errors as any)[name] = unmetRule;
    setErrors(errors);
  };

  const useTextInput = (
    name: string,
    validation: string,
    callback?: Function
  ) => useFormInput(name, formHandler, validation, handleError, callback);
  // console.log('isValid', mounted && !Object.values(errors).length, errors);

  return {
    values,
    setValues,
    useTextInput,
    isValid: mounted && !Object.values(errors).length
  };
}
