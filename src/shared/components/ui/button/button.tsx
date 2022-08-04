import styles from './button.module.css';
import Link from 'next/link';

import type { DetailedHTMLProps, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

const baseStyle = styles.base;

const semanticStyles = {
  button: { className: styles.button },
  submit: { className: styles.button },
  link: { className: styles.link },
};

const lookStyles = {
  green: { className: styles.green },
  red: { className: styles.red },
  orange: { className: styles.orange },
  yellow: { className: styles.yellow },
};

const disabledStyle = styles.disabled;

type ButtonProps = {
  look?: keyof typeof lookStyles;
} & (
  | ({
      semantic?: keyof Pick<typeof semanticStyles, 'button' | 'submit'>;
    } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>)
  | ({
      semantic: keyof Pick<typeof semanticStyles, 'link'>;
      url: string;
    } & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>)
);

export const Button = (props: ButtonProps) => {
  const className =
    baseStyle +
    ' ' +
    semanticStyles[props?.semantic ?? 'button'].className +
    (props?.look ? ' ' + lookStyles[props.look].className : '');

  if (props?.semantic === 'link') {
    return (
      <Link href={props?.url}>
        <a {...props} className={className}>
          {props.children}
        </a>
      </Link>
    );
  }

  return (
    <button
      {...props}
      type={props?.semantic === 'submit' ? 'submit' : 'button'}
      className={
        props?.look && props?.disabled
          ? className.replace(lookStyles[props.look].className, disabledStyle)
          : className
      }
    >
      {props.children}
    </button>
  );
};
