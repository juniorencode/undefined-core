import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useForm } from './useForm.hook';

describe('useForm hook', () => {
  test('should initialize with given initial values', () => {
    const initialForm = { name: 'John', age: 30 };
    const { result } = renderHook(() => useForm(initialForm));

    expect(result.current.watch).toEqual(initialForm);
  });

  test('should handle input change', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.register('name').handleChange('Doe');
    });

    expect(result.current.watch.name).toBe('Doe');
  });

  test('should validate required fields', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.register('name', { required: true });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
        stopPropagation: () => {}
      });
    });

    expect(result.current.errors.name).toEqual({
      type: 'required',
      message: 'Este campo es requerido.'
    });
  });

  test('should validate minLength for strings', () => {
    const { result } = renderHook(() => useForm({ name: 'Do' }));

    act(() => {
      result.current.register('name', { minLength: 3 });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
        stopPropagation: () => {}
      });
    });

    expect(result.current.errors.name).toEqual({
      type: 'minLength',
      message: 'El valor debe tener mínimo 3 caracteres.'
    });
  });

  test('should validate maxLength for strings', () => {
    const { result } = renderHook(() => useForm({ name: 'Doe John' }));

    act(() => {
      result.current.register('name', { maxLength: 5 });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
        stopPropagation: () => {}
      });
    });

    expect(result.current.errors.name).toEqual({
      type: 'maxLength',
      message: 'El valor debe tener máximo 5 caracteres.'
    });
  });

  test('should validate minValue for numbers', () => {
    const { result } = renderHook(() => useForm({ age: 17 }));

    act(() => {
      result.current.register('age', { minValue: 18 });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
        stopPropagation: () => {}
      });
    });

    expect(result.current.errors.age).toEqual({
      type: 'minValue',
      message: 'El número debe ser mayor o igual a 18.'
    });
  });

  test('should validate minValue and maxValue for numbers', () => {
    const { result } = renderHook(() => useForm({ age: 66 }));

    act(() => {
      result.current.register('age', { maxValue: 65 });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
        stopPropagation: () => {}
      });
    });

    expect(result.current.errors.age).toEqual({
      type: 'maxValue',
      message: 'El número debe ser menor o igual a 65.'
    });
  });

  test('should validate email format', () => {
    const { result } = renderHook(() => useForm({ email: 'invalid-email' }));

    act(() => {
      result.current.register('email', {
        isEmail: true
      });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
        stopPropagation: () => {}
      });
    });

    expect(result.current.errors.email).toEqual({
      type: 'isEmail',
      message: 'Por favor ingrese un correo electrónico válido.'
    });
  });

  test('should reset form data', () => {
    const initialForm = { name: 'John', age: 30 };
    const { result } = renderHook(() => useForm(initialForm));

    act(() => {
      result.current.register('name').handleChange('Doe');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.watch).toEqual(initialForm);
  });

  test('should set form data', () => {
    const initialForm = { name: 'John', age: 30 };
    const { result } = renderHook(() => useForm(initialForm));

    act(() => {
      result.current.setForm({ name: 'Doe', age: 25 });
    });

    expect(result.current.watch).toEqual({ name: 'Doe', age: 25 });
  });
});
