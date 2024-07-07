export const InputContainer = props => {
  const { children, label, name, error = '', ...params } = props;

  return (
    <div {...params}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 w-min text-sm text-nowrap font-medium text-neutral-600 dark:text-neutral-300"
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
