import styles from './cta.module.css';
import { LinkButton } from 'shared/components/ui/button';

export const CTA = () => {
  return (
    <div className={styles.cta}>
      <p>
        Avec My pizza, assemblez les ingrédients selon vos envies pour obtenir une pizza unique qui
        vous ressemble !
      </p>
      <LinkButton url="/order">Commander</LinkButton>
    </div>
  );
};
