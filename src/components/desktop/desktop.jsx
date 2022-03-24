import React from 'react';
import {Avatar, Button, Space, Typography} from 'antd';
import {BEER_AVATAR} from './../../constants/constants';
import Search from '../search/search';
import Filter from '../filter/filter';
import styles from './desktop.module.sass';

function Desktop ({currentUser, logOut, setSearch, searchBeers, filterBeers}) {
  const {Text, Title} = Typography;

  return (
    <Space className={styles.desktop} size='large'>
      <Space align='center' size='large'>
        <Avatar size={60} src={BEER_AVATAR} alt='avatar' />
        <Title className={styles.title}>My Profile</Title>
      </Space>
      <Space align='center' size='large' className={styles.contact__container}>
        <Button className={styles.button} type='default' onClick={logOut}>
          Sign Out
        </Button>
        <Space direction='vertical'>
          <Text strong className={styles.contact__text}>
            Logged in as:
          </Text>
          <Text className={styles.contact__text}>{currentUser?.email}</Text>
        </Space>
      </Space>
      <Search setSearch={setSearch} searchBeers={searchBeers} />
      <Filter filterBeers={filterBeers} />
    </Space>
  );
}

export default Desktop;
