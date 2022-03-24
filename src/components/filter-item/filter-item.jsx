import React from 'react';
import {Checkbox, Space} from 'antd';
import styles from './filter-item.module.sass';

const FilterItem = ({filterProperty, filterLabel, filterBeers}) => {
  return (
    <Space size='small' className={styles.container}>
      <label className={styles.label__text} for={`filter__${filterProperty}`}>
        {filterLabel}
      </label>
      <Checkbox
        id={`filter__${filterProperty}`}
        name={`filter__${filterProperty}`}
        value={filterProperty}
        onChange={filterBeers}
      />
    </Space>
  );
};

export default FilterItem;
