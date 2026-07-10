import { useState } from 'react';

export interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

export function useFormValidation<T extends Record<string, any>>(
  initialState: T,
  rules: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing again
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, values[field]);
  };

  const validateField = (field: keyof T, value: any) => {
    const fieldRules = rules[field];
    if (!fieldRules) return true;

    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        setErrors((prev) => ({ ...prev, [field]: rule.message }));
        return false;
      }
    }
    return true;
  };

  const validateAll = () => {
    let isValid = true;
    const newErrors: Partial<Record<keyof T, string>> = {};
    const newTouched: Partial<Record<keyof T, boolean>> = {};

    (Object.keys(values) as (keyof T)[]).forEach((key) => {
      newTouched[key] = true;
      const fieldRules = rules[key];
      if (fieldRules) {
        for (const rule of fieldRules) {
          if (!rule.validate(values[key])) {
            newErrors[key] = rule.message;
            isValid = false;
            break; // Stop at first error for this field
          }
        }
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return isValid;
  };

  const reset = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  };
}
