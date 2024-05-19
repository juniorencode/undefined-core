import { useState, FormEvent, KeyboardEvent } from 'react';
import { Errors, Validations, Register } from '../types/glabal';

type FormData = { [key: string]: string | number | boolean };
type FieldsValidation = { [key: string]: Validations };
type FieldsOutput = { [key: string]: 'STRING' | 'NUMBER' | 'BOOLEAN' };

const useForm = (initialForm: FormData = {}) => {
  const [errors, setErrors] = useState<Errors>({});
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [pending, setPending] = useState<boolean>(false);
  const fields: string[] = [];
  const fieldsValidation: FieldsValidation = {};
  const fieldsOutput: FieldsOutput = {};
  let onSubmit: ((data: FormData) => Promise<void>) | null = null;

  const register: Register = (name, validations = {}, output) => {
    if (!fieldsValidation[name]) fieldsValidation[name] = validations;
    if (!fields.includes(name)) fields.push(name);
    if (!fieldsOutput[name] && output)
      fieldsOutput[name] = output as 'STRING' | 'NUMBER' | 'BOOLEAN';

    return {
      errors,
      value: formData[name],
      handleChange: (value: string | number | boolean) =>
        setFormData(prev => {
          if (fieldsOutput[name]) {
            switch (fieldsOutput[name]) {
              case 'NUMBER':
                value = typeof value === 'string' ? parseFloat(value) : value;
                break;
              case 'BOOLEAN':
                value = value === 'true' || value === 1;
                break;
              default:
                break;
            }
          }
          return { ...prev, [name]: value };
        })
    };
  };

  const reset = () => setFormData(initialForm);

  const setForm = (data: FormData) => setFormData(data);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let haveErrors = false;
    const data = { ...formData };

    fields.forEach(name => {
      if (fieldsValidation[name]?.required && !data[name]) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: { type: 'required', message: 'Este campo es requerido.' }
        }));
      } else if (
        typeof data[name] === 'number' &&
        fieldsValidation[name]?.minValue &&
        data[name] < fieldsValidation[name].minValue
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'minValue',
            message: `El número debe ser mayor o igual a ${fieldsValidation[name].minValue}.`
          }
        }));
      } else if (
        typeof data[name] === 'number' &&
        fieldsValidation[name]?.maxValue &&
        data[name] > fieldsValidation[name].maxValue
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'maxValue',
            message: `El número debe ser menor o igual a ${fieldsValidation[name].maxValue}.`
          }
        }));
      } else if (
        typeof data[name] === 'string' &&
        fieldsValidation[name]?.minLength &&
        data[name]?.length < fieldsValidation[name].minLength
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'minLength',
            message: `El valor debe tener al menos ${fieldsValidation[name].minLength} caracteres.`
          }
        }));
      } else if (
        typeof data[name] === 'string' &&
        fieldsValidation[name]?.maxLength &&
        data[name]?.length > fieldsValidation[name].maxLength
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'maxLength',
            message: `El valor debe tener máximo ${fieldsValidation[name].maxLength} caracteres.`
          }
        }));
      } else if (
        typeof data[name] === 'string' &&
        fieldsValidation[name]?.isEmail &&
        !validateEmail(data[name])
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'isEmail',
            message: 'Por favor ingrese un correo electrónico válido.'
          }
        }));
      } else {
        setErrors(prev => ({ ...prev, [name]: {} }));
      }
    });

    if (haveErrors) return;
    if (!onSubmit) return;
    setPending(true);

    try {
      await onSubmit(data);
    } finally {
      setPending(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const [localPart, domainPart] = email.split('@');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) return false;
    if (localPart.length > 64 || domainPart.length > 255) return false;

    return true;
  };

  const handleAssistant = async (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      await handleSubmit(e);
    }
  };

  const registerSubmit = (func: (data: FormData) => Promise<void>) => {
    onSubmit = func;
  };

  return {
    register,
    registerSubmit,
    handleSubmit,
    handleAssistant,
    reset,
    setForm,
    setFormData,
    pending,
    watch: formData,
    errors
  };
};

export { useForm };
