import styles from './actions.module.css';
import { Button, LinkButton } from 'shared/components/ui/button';
import BackImg from './back.png';
import { Image } from 'shared/components/ui/image';

type ActionsProps = {
  cancel?: { label: string; onClick: () => void };
  submit?: { label: string; disabled?: boolean };
  back?: { label: string; onClick: () => void };
  home?: { label: string };
};

export const Actions = ({ cancel, submit, back, home }: ActionsProps) => {
  return (
    <div className={styles.actions}>
      {back && (
        <Button className={styles.backbtn} onClick={() => back?.onClick()}>
          <Image src={BackImg} alt={back.label} className={styles.backimg} />
          <span className={styles.backtxt}>{back.label}</span>
        </Button>
      )}
      {cancel && (
        <Button className={styles.cancelbtn} onClick={cancel.onClick}>
          {cancel.label}
        </Button>
      )}
      {submit && (
        <Button
          className={submit?.disabled ? styles.disabledbtn : styles.submitbtn}
          type="submit"
          disabled={submit?.disabled ?? false}
        >
          {submit.label}
        </Button>
      )}
      {home && (
        <LinkButton url="/" className={styles.homebtn}>
          {home.label}
        </LinkButton>
      )}
    </div>
  );
};
