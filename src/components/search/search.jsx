import React, {useCallback} from 'react';
import {Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import styles from './search.module.sass';

function Search ({search, setSearch, searchBeers}) {
  const onSearch = useCallback(
    e => {
      searchBeers(e.target.value);
      search = e.target.value;
      setSearch(search);
    },
    [searchBeers, setSearch]
  );

  return (
    <Input
      size='large'
      placeholder='Search'
      type='text'
      onChange={onSearch}
      suffix={<SearchOutlined />}
      className={styles.search}
    />
  );
}

export default Search;
