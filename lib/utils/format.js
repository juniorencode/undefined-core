export const formatInput = data => {
  const result = {};
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'number' || typeof data[key] === 'boolean') {
      result[key] = String(data[key]);
    } else {
      result[key] = data[key];
    }
  });
  return result;
};

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
