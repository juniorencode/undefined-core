import { useEffect, useRef } from 'react';

const useClickOutside = (callback: () => void) => {
  const domNode = useRef<HTMLDivElement>(null);

  const handler = (event: MouseEvent) => {
    if (domNode.current && !domNode.current.contains(event.target as Node))
      callback();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
    // eslint-disable-next-line
  }, []);

  return domNode;
};

export { useClickOutside };
