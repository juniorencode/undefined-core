export type Errors = { [key: string]: { type?: string; message?: string } };

export type Validations = {
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
};

interface RegisterReturn {
  errors: Errors;
  value: string | number | boolean;
  handleChange: (value: string | number | boolean) => void;
}

export interface Register {
  (...args: [string, Validations?, string?]): RegisterReturn;
}
