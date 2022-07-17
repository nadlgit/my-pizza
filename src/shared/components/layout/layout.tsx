import styles from './layout.module.css';
import Image from 'next/future/image';
import Logo from './logo.png';

type LayoutProps = { children: React.ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Image className={styles.logo} src={Logo} alt="Logo de My pizza" />
        <h1>My pizza</h1>
      </header>
      {children}
    </main>
  );
};
