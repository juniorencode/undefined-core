import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

export const Breadcrumb = ({ options, folders }) => {
  return (
    <nav className="flex h-4">
      <ol className="inline-flex items-center space-x-1.5 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            className="inline-flex gap-2 items-center md:ms-2 text-xs font-medium text-secondary-700 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
            to="/"
          >
            <FaHome size={15} />
            Inicio
          </Link>
        </li>
        {options?.map(item => (
          <li key={item.url}>
            <div className="flex items-center text-secondary-500 dark:text-secondary-400">
              <IoIosArrowForward size={15} />
              {item.url ? (
                <Link
                  className="ms-1 text-xs font-medium text-secondary-700 hover:text-primary-600 md:ms-2 dark:text-secondary-400 dark:hover:text-primary-400"
                  to={folders ? `/folder/${item.url}` : item.url}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="ms-1 text-xs font-medium text-secondary-700 dark:text-secondary-300">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
