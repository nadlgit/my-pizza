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
        <Button color="orange" onClick={() => back?.onClick()}>
          <Image src={BackImg} alt={back.label} className={styles.backimg} />
          <span className={styles.backtxt}>{back.label}</span>
        </Button>
      )}
      {cancel && (
        <Button color="red" className={styles.widebtn} onClick={cancel.onClick}>
          {cancel.label}
        </Button>
      )}
      {submit && (
        <Button
          color="green"
          className={styles.widebtn}
          type="submit"
          disabled={submit?.disabled ?? false}
        >
          {submit.label}
        </Button>
      )}
      {home && (
        <LinkButton color="orange" url="/">
          {home.label}
        </LinkButton>
      )}
    </div>
  );
};
