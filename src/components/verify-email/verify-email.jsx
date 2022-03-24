import React, {useEffect, useState} from 'react';
import {Alert, Avatar, Button, Space, Spin, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useAuthValue} from '../auth/auth-context';
import {auth} from '../../firebase';
import {BEER_AVATAR} from './../../constants/constants';
import Header from './../header/header';
import styles from './verify-email.module.sass';
import {sendEmailVerification} from 'firebase/auth';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {currentUser} = useAuthValue();
  const [time, setTime] = useState(60);
  const {timeActive, setTimeActive} = useAuthValue();
  const navigate = useNavigate();
  const {Text, Title} = Typography;

  useEffect(() => {
    const internal = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(internal);
            setLoading(true);
            navigate('/');
          }
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    }, 1000);
  }, [navigate, setLoading, currentUser]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  const resendEmailVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setTimeActive(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Space size='large' align='center' className={styles.verify__email}>
        <Header />
        {loading ? (
          <Spin tip='Loading...' />
        ) : (
          <Space direction='vertical' align='center'>
            <Avatar size={75} src={BEER_AVATAR} alt='avatar' />
            <Title>VERIFY YOUR EMAIL ADDRESS</Title>
            {error && (
              <Alert
                message='Error'
                description={error}
                type='error'
                showIcon
                closable
              />
            )}
            <Space direction='vertical'>
              <Text type='secondary'>
                A Verification email has been sent to:{' '}
                <Text strong>{currentUser?.email}</Text>
              </Text>
              <Text type='warning' className={styles.text}>
                Follow the instruction in the email to verify your account
              </Text>
              <Button
                size='large'
                className={styles.button}
                onClick={resendEmailVerification}
                disabled={timeActive}>
                Resend Email {timeActive && time}
              </Button>
            </Space>
          </Space>
        )}
      </Space>
    </div>
  );
};

export default VerifyEmail;
