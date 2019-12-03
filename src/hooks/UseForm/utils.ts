import * as validator from 'validator';
import { ObjectMap } from '../../utils/types';

export type ErrorCallbackFn = (name: string, unmetRule: string | null) => void;

export function validate(value: any, validation: ObjectMap | undefined | string): string | null {
  const fieldsToValidate: any = {};
  let trimmedValidation: string;

  switch (typeof validation) {
    case 'object':
      Object.keys(validation).forEach(property => {
        fieldsToValidate[property] = validation[property];
      });
      break;
    case 'undefined': {
      return null;
    }
    case 'string':
    default:
      if (!validation.length) {
        return null;
      }

      trimmedValidation = validation.replace(/ /g, '');
      trimmedValidation.split(',').forEach(fieldName => {
        fieldsToValidate[fieldName.trim()] = true;
      });
  }

  // check whether we do need to validate at all
  const isRequired = fieldsToValidate.isRequired || fieldsToValidate.isEmpty === false;
  if (!value && !isRequired) {
    return null;
  }

  let unmetValidationRule = null;
  let isValid = true;

  Object.keys(fieldsToValidate).forEach((rule: any) => {
    // don't proceed if we're already invalid
    if (!isValid) {
      return;
    }

    const options = fieldsToValidate[rule];

    switch (rule) {
      case 'isRequired':
        if (!value) {
          isValid = false;
        }
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

    if (!isValid) {
      unmetValidationRule = rule;
    }
  });

  return unmetValidationRule || null;
}

export const formUtils = {
  validate,
};
