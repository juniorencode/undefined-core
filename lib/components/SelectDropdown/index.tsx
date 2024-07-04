import { useState } from 'react';
import { usePopper } from 'react-popper';
import { cn } from '../../utils/styles';

interface SelectDropdownProps {
  name: string;
  value: string | number | boolean;
  isOpen: boolean;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsOpen: (isOpen: boolean) => void;
}

interface Option {
  value: string;
  label: string;
}

const SelectDropdown = (props: SelectDropdownProps) => {
  const { name, value, isOpen, options = [], onChange, setIsOpen } = props;
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

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
            {options?.map(item => (
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
                    'block px-4 py-2 text-sm cursor-pointer hover:bg-secondary-100 dark:hover:bg-secondary-600 dark:hover:text-white',
                    {
                      'bg-secondary-100 dark:bg-secondary-600':
                        item.value === value
                    }
                  )}
                  htmlFor={item.value}
                >
                  {item.label}
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
