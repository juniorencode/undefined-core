import { useState, useCallback, useRef } from 'react';
import { getValidationError } from '../utils/validate';
import { formatOutput } from '../utils/format';

export const useForm = (initialForm = {}) => {
  const [formData, setFormData] = useState(initialForm);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({});
  const fieldsValidation = useRef({});
  const fieldsOutput = useRef({});
  const onSubmit = useRef(null);

  const register = useCallback(
    (name, validations = {}, output) => {
      if (!fieldsValidation.current[name])
        fieldsValidation.current[name] = validations;
      if (!fieldsOutput.current[name] && output)
        fieldsOutput.current[name] = output;

      return {
        errors: errors,
        value: formData[name],
        handleChange: value => setFormData(prev => ({ ...prev, [name]: value }))
      };
    },
    [errors, formData]
  );

  const reset = useCallback(() => {
    setFormData(initialForm);
  }, [initialForm]);

  const setForm = useCallback(data => {
    setFormData(data);
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      e.stopPropagation();

      const validationResult = validateFields(formData);
      if (validationResult.haveErrors) return;
      if (!onSubmit.current) return;

      const formattedData = formatFormData(validationResult.data);
      setPending(true);

      try {
        await onSubmit.current(formattedData);
      } finally {
        setPending(false);
      }
    },
    [formData]
  );

  const formatFormData = useCallback(data => {
    const formattedData = { ...data };
    Object.keys(fieldsOutput.current).forEach(name => {
      if (fieldsOutput.current[name]) {
        formattedData[name] = formatOutput(
          data[name],
          fieldsOutput.current[name]
        );
      }
    });
    return formattedData;
  }, []);

  const validateFields = useCallback(data => {
    let haveErrors = false;
    const errors = {};

    Object.keys(fieldsValidation.current).forEach(name => {
      const validation = fieldsValidation.current[name];
      const value = data[name];

      const error = getValidationError(value, validation);
      if (error) {
        haveErrors = true;
        errors[name] = error;
      }
    });

    setErrors(errors);
    return { haveErrors, data };
  }, []);

  const handleAssistant = useCallback(
    async e => e.key === 'Enter' && (await handleSubmit(e)),
    [handleSubmit]
  );

  const registerSubmit = useCallback(func => {
    onSubmit.current = func;
  }, []);

  return {
    register,
    registerSubmit,
    handleSubmit,
    handleAssistant,
    reset,
    setForm,
    setFormData,
    pending: pending,
    watch: formData,
    errors: errors
  };
};
