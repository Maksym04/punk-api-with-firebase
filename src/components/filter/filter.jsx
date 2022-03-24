import React from 'react';
import {Space} from 'antd';
import FilterItem from '../filter-item/filter-item';
import styles from './filter.module.sass';

const Filter = ({filterBeers}) => {
  return (
    <Space direction='vertical' size='large' className={styles.container}>
      <FilterItem
        filterProperty='abv'
        filterLabel='High ABV (> 6.0%)'
        filterBeers={filterBeers}
      />
      <FilterItem
        filterProperty='low-abv'
        filterLabel='Low ABV (< 6.0%)'
        filterBeers={filterBeers}
      />
      <FilterItem
        filterProperty='classic'
        filterLabel='Brew Date < 2010'
        filterBeers={filterBeers}
      />
      <FilterItem
        filterProperty='classic1'
        filterLabel='Brew Date > 2010'
        filterBeers={filterBeers}
      />
      <FilterItem
        filterProperty='acidic'
        filterLabel='Acidic (pH < 4)'
        filterBeers={filterBeers}
      />
    </Space>
  );
};

export default Filter;
