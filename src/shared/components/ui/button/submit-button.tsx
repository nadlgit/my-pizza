import { Button } from './button';

import type { ReactNode } from 'react';

type SubmitButtonProps = {
  children: ReactNode;
  disabled?: boolean;
};

export const SubmitButton = ({ children, disabled }: SubmitButtonProps) => {
  return (
    <Button semantic="submit" look="green" disabled={disabled}>
      {children}
    </Button>
  );
};
