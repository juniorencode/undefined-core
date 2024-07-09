export const Button = ({ icon, onClick }) => {
  return (
    <button
      className="flex items-center justify-center w-8 h-8 focus:ring-4 focus:ring-opacity-50 rounded-lg transition-all text-secondary-600 hover:text-primary-600 focus:text-primary-500 bg-transparent hover:bg-secondary-300 focus:bg-secondary-300 dark:focus:bg-secondary-800 dark:hover:bg-secondary-800 border-neutral-300 focus:ring-primary-500"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
