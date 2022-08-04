import { Button } from './button';

import type { ReactNode } from 'react';

type LinkButtonProps = {
  children: ReactNode;
  url: string;
};

export const LinkButton = ({ children, url }: LinkButtonProps) => {
  return (
    <Button semantic="link" url={url} look="orange">
      {children}
    </Button>
  );
};
