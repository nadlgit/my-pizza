import styles from './layout.module.css';
import Logo from './logo.png';
import { Image } from 'shared/components/ui/image';
import Link from 'next/link';

type LayoutProps = { children: React.ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <Image className={styles.logo} src={Logo} alt="Logo de My pizza" />
            <h1>My pizza</h1>
          </a>
        </Link>
      </header>
      {children}
    </main>
  );
};
