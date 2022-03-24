import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {Alert, Avatar, Button, Space, Spin, Tooltip, Typography} from 'antd';
import {UserOutlined, KeyOutlined, GoogleOutlined} from '@ant-design/icons';
import {Form, Formik} from 'formik';
import {auth, googleProvider} from '../../firebase';
import {BEER_AVATAR} from './../../constants/constants';
import {LOGIN_SCHEMA} from '../../utils/validating-schemas';
import {
  emailTooltipText,
  passwordTooltipText,
} from './../../utils/validating-rules';
import Input from '../input/input';
import Header from '../header/header';
import styles from './login.module.sass';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {Title, Text} = Typography;

  const initialValues = {
    email: '',
    password: '',
  };

  const login = async ({email, password}, formikBag) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(true);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
    formikBag.resetForm();
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoading(true);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Space size='large' align='center' className={styles.login}>
        <Header />
        {loading ? (
          <Spin tip='Loading...' />
        ) : (
          <Space direction='vertical' align='center'>
            <Avatar size={75} src={BEER_AVATAR} alt='avatar' />
            <Title>WELCOME</Title>
            {error && (
              <Alert
                message='Error'
                description={error.message}
                type='error'
                showIcon
                closable
              />
            )}
            <Formik
              initialValues={initialValues}
              onSubmit={login}
              validationSchema={LOGIN_SCHEMA}>
              {formikProps => (
                <Form className={styles.login__container}>
                  <Tooltip title={emailTooltipText}>
                    <Input
                      type='text'
                      name='email'
                      placeholder='Email Address'
                      icon={UserOutlined}
                    />
                  </Tooltip>
                  <Tooltip title={passwordTooltipText}>
                    <Input
                      type='password'
                      name='password'
                      placeholder='Password'
                      icon={KeyOutlined}
                    />
                  </Tooltip>
                  <Space direction='vertical'>
                    <Button
                      size='large'
                      htmlType='submit'
                      className={styles.button}>
                      Login
                    </Button>
                    <Button
                      size='large'
                      type='primary'
                      onClick={signInWithGoogle}
                      className={styles.button}>
                      Login with <GoogleOutlined className={styles.icon} />
                    </Button>
                    <Text className={styles.text}>
                      Don't have an account?{' '}
                      <Link to='/register'>Register</Link> now.
                    </Text>
                  </Space>
                </Form>
              )}
            </Formik>
          </Space>
        )}
      </Space>
    </div>
  );
};

export default Login;
