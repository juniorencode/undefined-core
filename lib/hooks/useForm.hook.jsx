import { useState, useCallback, useRef } from 'react';
import { getValidationError } from '../utils/validate';
import { formatOutput } from '../utils/format';

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState({
    errors: {},
    formData: initialForm,
    pending: false
  });
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
        errors: formState.errors,
        value: formState.formData[name],
        handleChange: value =>
          setFormState(prev => ({
            ...prev,
            formData: { ...prev.formData, [name]: value }
          }))
      };
    },
    [formState.errors, formState.formData]
  );

  const reset = useCallback(
    () =>
      setFormState(prev => ({
        ...prev,
        formData: initialForm
      })),
    [initialForm]
  );

  const setForm = useCallback(
    data =>
      setFormState(prev => ({
        ...prev,
        formData: data
      })),
    []
  );

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      e.stopPropagation();

      const formattedData = formatFormData(formState.formData);
      const validationResult = validateFields(formattedData);

      if (validationResult.haveErrors) return;

      if (!onSubmit.current) return;
      setFormState(prev => ({ ...prev, pending: true }));

      try {
        await onSubmit.current(validationResult.data);
      } finally {
        setFormState(prev => ({ ...prev, pending: false }));
      }
    },
    [formState.formData]
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

    setFormState(prev => ({ ...prev, errors }));
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
    setFormData: data =>
      setFormState(prev => ({
        ...prev,
        formData: data
      })),
    pending: formState.pending,
    watch: formState.formData,
    errors: formState.errors
  };
};
