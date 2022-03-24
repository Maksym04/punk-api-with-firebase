import React, {useCallback} from 'react';
import {Button, Result, Space} from 'antd';
import {useNavigate} from 'react-router-dom';
import styles from './error.module.sass';

const Error = () => {
  const navigate = useNavigate();

  const backHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Space className={styles.container}>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button size='large' type='primary' onClick={backHome}>
            Back Home
          </Button>
        }
      />
    </Space>
  );
};

export default Error;
