import React from 'react';
import {BackTop, Card, Image, Pagination, Space, Typography} from 'antd';
import {NULL_IMAGE} from '../../constants/constants';
import BeerDetails from '../beer-details/beer-details';
import Error from '../error/error';
import styles from './display.module.sass';

function Display ({
  error,
  beers,
  currentPage,
  pageSize,
  onChangePage,
  minIndex,
  maxIndex,
}) {
  const {Meta} = Card;
  const {Title, Text} = Typography;

  return (
    <div className={styles.container}>
      {error ? (
        <Error />
      ) : (
        <>
          <div className={styles.display}>
            {beers.map(
              (beer, index) =>
                index >= minIndex &&
                index < maxIndex && (
                  <div className={styles.card__container}>
                    <Card
                      hoverable
                      className={styles.card}
                      cover={
                        <Space className={styles.image__container}>
                          <Image
                            width={80}
                            alt='beer'
                            src={
                              beer.image_url === null
                                ? NULL_IMAGE
                                : beer.image_url
                            }
                            preview={false}
                          />
                        </Space>
                      }
                      key={beer.id}>
                      <Meta
                        title={
                          <div className={styles.title__container}>
                            <Title level={3}>{beer.name}</Title>
                          </div>
                        }
                        description={
                          <BeerDetails
                            tagline={beer.tagline}
                            description={beer.description}
                            ibu={beer.ibu}
                            abv={beer.abv}
                            first_brewed={beer.first_brewed}
                          />
                        }
                      />
                    </Card>
                  </div>
                )
            )}
            <BackTop>
              <Space size='large' className={styles.back__top}>
                <Text strong>Up</Text>
              </Space>
            </BackTop>
          </div>
          <Space className={styles.pagination}>
            <Pagination
              size='default'
              current={currentPage}
              total={350}
              pageSize={pageSize}
              onChange={onChangePage}
            />
          </Space>
        </>
      )}
    </div>
  );
}

export default Display;
