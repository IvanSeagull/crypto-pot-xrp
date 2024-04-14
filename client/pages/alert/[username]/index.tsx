'use client';

import React from 'react';

import styles from './styles.module.scss';
import { socket } from '../../../src/utils/sockets';
import { useRouter } from 'next/router';

const duration = 5;

const Alert = () => {
  const router = useRouter();
  const { username } = router.query;
  const [alerts, setAlerts] = React.useState<any[]>([]);
  const [isVisible, setIsVisible] = React.useState(false);

  const [isShowing, setIsShowing] = React.useState(false);

  const createAlert = (message: string, senderData: any, amount: number) => {
    console.log('Creating alert');
    console.log(senderData, amount, message);
    const newAlert = (
      <div className={styles.alertsCon}>
        <img src="/easya.png" alt="eth" className={styles.icon} />
        <h1 className={styles.mainInfo}>
          {senderData.username} donated {amount} xrp
        </h1>
        <p className={styles.msg}>{message}</p>
      </div>
    );

    setAlerts((prev) => [...prev, newAlert]);
  };
  React.useEffect(() => {
    if (!username) return;
    socket.connect();
    socket.emit('join-alerts', username);

    socket.on('new-donation', (data: any) => {
      // console.log('New donation', data);
      createAlert(data.message, data.senderData, data.amount);
    });

    return () => {
      socket.off('donate');
      socket.disconnect();
    };
  }, [username]);

  const showAlert = () => {
    if (alerts.length > 0) {
      setIsShowing(true);
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          console.log('Hiding');
        }, duration * 1000);

        setTimeout(() => {
          setAlerts((prev) => prev.filter((_, i) => i !== 0));
        }, duration * 1000 + 2000);

        setTimeout(() => {
          setIsShowing(false);
        }, duration * 1000 + 3000);
      }, 1000);
    }
  };

  React.useEffect(() => {
    console.log('New alert', alerts, isShowing);
    if (!isShowing) {
      console.log('showing alert');
      showAlert();
    }
  }, [alerts, isShowing]);

  return (
    <>
      <button
        onClick={() => {
          createAlert('message', { username: 'username', wallet: 'wallet' }, 20);
        }}>
        Test
      </button>
      <div className={isVisible ? styles.activeWrapper : styles.wrapper}>
        {alerts.length > 0 && alerts[0]}
      </div>
    </>
  );
};

export default Alert;
