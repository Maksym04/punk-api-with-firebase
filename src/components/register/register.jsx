import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {Alert, Avatar, Button, Space, Spin, Tooltip, Typography} from 'antd';
import {UserOutlined, KeyOutlined} from '@ant-design/icons';
import {Form, Formik} from 'formik';
import {useAuthValue} from '../auth/auth-context';
import {auth} from '../../firebase';
import {REGISTER_SCHEMA} from '../../utils/validating-schemas';
import {
  emailTooltipText,
  passwordTooltipText,
  passwordConfirmationTooltipText,
} from './../../utils/validating-rules';
import {BEER_AVATAR} from './../../constants/constants';
import Input from '../input/input';
import Header from '../header/header';
import styles from './register.module.sass';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {setTimeActive} = useAuthValue();
  const {currentUser} = useAuthValue();
  const {Title, Text} = Typography;

  const initialValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const register = async ({name, email, password}, formikBag) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      name = currentUser?.name;
      setTimeActive(true);
      setLoading(true);
      navigate('/verify-email');
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
    formikBag.resetForm();
  };

  return (
    <div className={styles.container}>
      <Space size='large' align='center' className={styles.register}>
        <Header />
        {loading ? (
          <Spin tip='Loading...' />
        ) : (
          <Space direction='vertical' align='center'>
            <Avatar size={75} src={BEER_AVATAR} alt='avatar' />
            <Title>REGISTER</Title>
            {error && (
              <Alert
                message='Error'
                description={error}
                type='error'
                showIcon
                closable
              />
            )}
            <Formik
              initialValues={initialValues}
              onSubmit={register}
              validationSchema={REGISTER_SCHEMA}>
              {formikProps => (
                <Form className={styles.register__container}>
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
                  <Tooltip title={passwordConfirmationTooltipText}>
                    <Input
                      type='password'
                      name='passwordConfirmation'
                      placeholder='Confirm Password'
                      icon={KeyOutlined}
                    />
                  </Tooltip>
                  <Space direction='vertical'>
                    <Button
                      size='large'
                      htmlType='submit'
                      className={styles.button}>
                      Register
                    </Button>
                    <Text className={styles.text}>
                      Already have an account? <Link to='/login'>Login</Link>{' '}
                      now.
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

export default Register;
