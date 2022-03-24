import React, {useCallback, useEffect, useState} from 'react';
import {Space, Spin} from 'antd';
import {signOut} from 'firebase/auth';
import {useAuthValue} from '../auth/auth-context';
import {auth} from '../../firebase';
import {getBeersApi, searchBeersApi} from '../../api/api';
import Desktop from '../desktop/desktop';
import styles from './dashboard.module.sass';
import Display from '../display/display';
import {pageSize} from '../../constants/constants';

const Dashboard = () => {
  const [beers, setBeers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const {currentUser} = useAuthValue();

  const logOut = async () => {
    try {
      await signOut(auth);
      setLoading(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchBeers = useCallback(
    (page = 1) => {
      setLoading(true);
      setError(false);
      setMinIndex(0);
      setMaxIndex(pageSize);
      getBeersApi(page, pageSize)
        .then(response => {
          setBeers(response.data);
          setCurrentPage(page);
        })
        .catch(err => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setLoading, setError, setMinIndex, setMaxIndex, setBeers, setCurrentPage]
  );

  const searchBeers = useCallback(
    searchText => {
      if (searchText !== '') {
        return searchBeersApi(searchText).then(response => {
          setBeers(response.data);
          setSearch(searchText);
        });
      } else {
        return fetchBeers();
      }
    },
    [setBeers, setSearch, fetchBeers]
  );

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  const onChangePage = useCallback(
    page => {
      setCurrentPage(page);
      setMinIndex((page - 1) * pageSize);
      setMaxIndex(page * pageSize);
      fetchBeers(page);
    },
    [setCurrentPage, setMaxIndex, setMinIndex, fetchBeers]
  );

  const filterBeers = useCallback(
    e => {
      switch (e.target.value) {
        case 'abv':
          e.target.checked
            ? setBeers(beers.filter(beer => beer.abv > 6))
            : fetchBeers();
          break;
        case 'low-abv':
          e.target.checked
            ? setBeers(beers.filter(beer => beer.abv < 6))
            : fetchBeers();
          break;
        case 'classic':
          e.target.checked
            ? setBeers(
                beers.filter(
                  beer => parseInt(beer.first_brewed.split('/')[1]) < 2010
                )
              )
            : fetchBeers();
          break;
        case 'classic1':
          e.target.checked
            ? setBeers(
                beers.filter(
                  beer => parseInt(beer.first_brewed.split('/')[1]) > 2010
                )
              )
            : fetchBeers();
          break;
        case 'acidic':
          e.target.checked
            ? setBeers(beers.filter(beer => beer.ph < 4))
            : fetchBeers();
          break;
        default:
          break;
      }
    },
    [setBeers, beers, fetchBeers]
  );

  return (
    <div className={styles.dashboard}>
      {loading ? (
        <Space align='center' className={styles.spin__container}>
          <Spin size='large' tip='Loading' />
        </Space>
      ) : (
        <>
          <Desktop
            currentUser={currentUser}
            logOut={logOut}
            searchBeers={searchBeers}
            search={search}
            setSearch={setSearch}
            filterBeers={filterBeers}
          />
          <Display
            error={error}
            beers={beers}
            currentPage={currentPage}
            pageSize={pageSize}
            onChangePage={onChangePage}
            minIndex={minIndex}
            maxIndex={maxIndex}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
