import React from 'react';
import {Space, Tooltip, Typography} from 'antd';
import styles from './beer-details.module.sass';

const BeerDetails = ({tagline, description, ibu, abv, first_brewed}) => {
  const {Title, Text} = Typography;

  return (
    <div className={styles.container}>
      <Title level={5}>{tagline}</Title>
      <Space align='center' direction='vertical' size='middle'>
        <Tooltip
          title={<Text className={styles.details__text}>{description}</Text>}
          color='#FFA07A'
          arrowPointAtCenter>
          <Space
            className={styles.details__container}
            align='center'
            size='large'>
            OPEN DETAILES
          </Space>
        </Tooltip>
        <Space align='center' size='middle'>
          <Text className={styles.text}> The first brewed</Text>
          <Text>{first_brewed}</Text>
        </Space>
        <Space align='center' size='middle'>
          <Text className={styles.text}>IBU:</Text>
          <Text>{ibu}%</Text>
        </Space>
        <Space align='center' size='middle'>
          <Text className={styles.text}>ABV:</Text>
          <Text>{abv}%</Text>
        </Space>
      </Space>
    </div>
  );
};

export default BeerDetails;
