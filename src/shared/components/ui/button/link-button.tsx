import styles from './button.module.css';
import Link from 'next/link';

import type { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

type LinkButtonProps = {
  url: string;
} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const LinkButton = ({ url, className, children, ...otherprops }: LinkButtonProps) => {
  return (
    <Link href={url}>
      <a className={`${styles.button} ${styles.link} ${className ?? ''}`} {...otherprops}>
        {children}
      </a>
    </Link>
  );
};
