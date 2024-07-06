export const InputContainer = props => {
  const { children, label, name, error = '', ...params } = props;

  return (
    <div {...params}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 w-min text-sm text-nowrap font-medium text-secondary-900 dark:text-white"
        >
          {label}
        </label>
      )}
      {children}
      <span className="flex justify-end mt-1 h-4 text-xs text-red-600 dark:text-red-400">
        {error}
      </span>
    </div>
  );
};
