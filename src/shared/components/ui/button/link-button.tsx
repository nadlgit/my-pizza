import styles from './button.module.css';
import Link from 'next/link';

import type { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';
import type { ButtonColor } from './button';

type LinkButtonProps = {
  color: ButtonColor;
  url: string;
} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const LinkButton = ({ color, url, className, children, ...otherprops }: LinkButtonProps) => {
  return (
    <Link href={url}>
      <a
        className={`${styles.button} ${styles[color] ?? ''} ${styles.link} ${className ?? ''}`}
        {...otherprops}
      >
        {children}
      </a>
    </Link>
  );
};
