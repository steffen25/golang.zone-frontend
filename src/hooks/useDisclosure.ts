import * as React from 'react';

export const useDisclosure = (initial: boolean = false) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(initial);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen((state: boolean) => !state), []);

  return { isOpen, open, close, toggle };
};
