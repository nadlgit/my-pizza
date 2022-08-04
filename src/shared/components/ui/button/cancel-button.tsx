import { Button } from './button';

import type { ReactNode } from 'react';

type CancelButtonProps = {
  children: ReactNode;
  onCancel: () => void;
};

export const CancelButton = ({ children, onCancel }: CancelButtonProps) => {
  return (
    <Button look="red" onClick={() => onCancel()}>
      {children}
    </Button>
  );
};
