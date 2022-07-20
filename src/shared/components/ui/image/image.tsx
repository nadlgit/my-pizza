import styles from './image.module.css';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

type ImageProps = Pick<NextImageProps, 'src' | 'alt' | 'className'>;

export const Image = ({ src, alt, className }: ImageProps) => {
  return (
    <span className={`${styles.imgwrapper} ${className}`}>
      <NextImage src={src} alt={alt} layout="fill" />
    </span>
  );
};
