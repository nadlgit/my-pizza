import styles from './contact.module.css';
import { contactInfo } from 'data/store-info';
import dynamic from 'next/dynamic';

import type { MapProps } from './map';

const Map = dynamic<MapProps>(() => import('./map').then((module) => module.Map), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'hsl(0,0%,90%)' }}></div>
  ),
});

export const Contact = () => {
  return (
    <div className={styles.contact}>
      <div className={styles.info}>
        <p>Nous contacter</p>
        <p>{contactInfo.address.line1}</p>
        <p>{contactInfo.address.city}</p>
        <p>{`Tel: ${contactInfo.phoneNumber}`}</p>
      </div>
      <Map />
    </div>
  );
};
