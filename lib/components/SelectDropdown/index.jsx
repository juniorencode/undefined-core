import { useState } from 'react';
import { usePopper } from 'react-popper';
import { cn } from '../../utils/styles';
import { MdClose } from 'react-icons/md';

const SelectDropdown = props => {
  const {
    name,
    value,
    isOpen,
    options = [],
    onChange,
    setIsOpen,
    funcDelete
  } = props;

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: isOpen ? 'bottom-start' : 'top-start'
  });

  return (
    <div className="relative" ref={node => setReferenceElement(node)}>
      {options.length > 0 && isOpen && (
        <div
          className="listbox absolute top-full z-20 mt-2 w-full border rounded-lg shadow-3xl bg-white dark:bg-secondary-700 dark:border-neutral-600 dark:shadow-neutral-900"
          ref={setPopperElement}
          role="listbox"
          style={styles.popper}
          {...attributes.popper}
        >
          <ul className="my-2 max-h-[200px] text-sm overflow-y-auto text-secondary-700 dark:text-secondary-200">
            {options?.map((item, index) => (
              <li key={item.value}>
                <input
                  className="hidden"
                  id={item.value}
                  name={name}
                  type="radio"
                  value={item.value}
                  onChange={onChange}
                  onClick={() => setIsOpen(!isOpen)}
                  checked={item.value === value}
                />
                <label
                  className={cn(
                    'flex items-center justify-between pl-4 pr-2 h-9 text-sm cursor-pointer transition-all duration-200 group hover:bg-secondary-100 dark:hover:bg-secondary-600 dark:hover:text-white',
                    {
                      'bg-secondary-100 dark:bg-secondary-600':
                        item.value === value
                    }
                  )}
                  htmlFor={item.value}
                >
                  {item.label}
                  {funcDelete && (
                    <button
                      className="p-2 opacity-0 group-hover:opacity-100 group-hover:inline transition-all duration-200 text-neutral-400 hover:text-red-500"
                      onClick={e => {
                        e.preventDefault();
                        funcDelete(item.id || index.toString());
                      }}
                    >
                      <MdClose size={20} />
                    </button>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { SelectDropdown };
