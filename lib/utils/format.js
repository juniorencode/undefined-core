export const formatOutput = (value, output) => {
  switch (output) {
    case 'STRING':
      return typeof value === 'number' ? value.toString() : value;
    case 'NUMBER':
      return typeof value === 'string' ? parseFloat(value) : value;
    case 'BOOLEAN':
      return value === 'true' || value === 1;
    default:
      return value;
  }
};
