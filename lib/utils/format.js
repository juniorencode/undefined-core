export const formatOutput = (value, output) => {
  switch (output) {
    case 'NUMBER':
      return typeof value === 'string' ? parseFloat(value) : value;
    case 'BOOLEAN':
      return value === 'true' || value === 1;
    default:
      return value;
  }
};
