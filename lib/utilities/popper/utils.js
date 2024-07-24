import { useEffect, useLayoutEffect } from 'react';

const fromEntries = entries =>
  entries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
    ? useLayoutEffect
    : useEffect;

export { fromEntries, useIsomorphicLayoutEffect };
