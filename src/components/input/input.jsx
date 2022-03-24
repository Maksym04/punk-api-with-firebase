import React from 'react';
import {Field} from 'formik';
import {Space} from 'antd';
import Icon from '@ant-design/icons';
import classNames from 'classnames';
import styles from './input.module.sass';

const Input = ({name, icon, ...rest}) => {
  return (
    <Space>
      <Icon component={icon} className={styles.icon} />
      <Field name={name}>
        {({field, form, meta}) => {
          const inputClassName = classNames(styles.login__textBox, {
            [styles.valid__login__textBox]: !meta.error && meta.touched,
            [styles.invalid__login__textBox]: meta.error && meta.touched,
          });
          return <input {...field} {...rest} className={inputClassName} />;
        }}
      </Field>
    </Space>
  );
};

export default Input;
