import { useState, useCallback } from 'react';
import emailRegex from '../utils/emailRegex';


const useFormWithValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  function handleInputChange(evt) {
    const input = evt.target;
    const value = input.value;
    const name = input.name;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());

    if (input.type === 'email') {
      if (validateEmail(value)) {
        setIsValid(input.closest("form").checkValidity());
      } else if (!value.includes('.')) {
        setErrors({ ...errors, [name]: 'Адрес электронной почты должен содердать символ "."'});
        setIsValid(false);
      } else {
        setIsValid(false);
      }
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, errors, isValid, handleInputChange, resetForm };
};

export { useFormWithValidation };
