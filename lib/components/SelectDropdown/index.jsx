import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { usePopper } from 'react-popper';
import { cn } from '../../utils/styles';

export const SelectDropdown = props => {
  const {
    domRef,
    name,
    value,
    isOpen,
    options = [],
    onChange,
    setIsOpen,
    funcDelete
  } = props;

  const [popperRef, setPopperRef] = useState(null);

  const { styles, attributes } = usePopper(domRef.current, popperRef, {
    placement: isOpen ? 'bottom-start' : 'top-start'
  });

  const shadowClass = attributes.popper?.['data-popper-placement'].startsWith(
    'top'
  )
    ? 'shadow-box-top'
    : 'shadow-box-bottom';

  return (
    <>
      {options.length > 0 && isOpen && (
        <div
          className={cn(
            'listbox absolute top-full z-20 my-2 w-full border rounded-lg bg-white dark:bg-secondary-700 dark:border-neutral-600 dark:shadow-neutral-900',
            shadowClass
          )}
          ref={setPopperRef}
          role="listbox"
          style={styles.popper}
          {...attributes.popper}
        >
          <ul className="my-2 max-h-[200px] text-sm overflow-y-auto text-neutral-700 dark:text-neutral-200">
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
                    'flex items-center justify-between pl-4 pr-2 h-9 text-sm cursor-pointer transition-all duration-200 group hover:bg-opacity-20 dark:hover:bg-opacity-20 hover:bg-primary-500 hover:dark:bg-primary-500 dark:hover:text-white',
                    {
                      'bg-opacity-50 dark:bg-opacity-40 hover:bg-opacity-50 dark:hover:bg-opacity-40 bg-primary-500 dark:bg-primary-500':
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
    </>
  );
};
