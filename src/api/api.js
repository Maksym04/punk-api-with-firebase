import axios from 'axios';

const BASE_URI = 'https://api.punkapi.com/v2/beers';

export const getBeersApi = async (page, pageSize) => {
  return await axios.get(`${BASE_URI}?page=${page}&per_page=${pageSize}`);
};

export const searchBeersApi = async value => {
  return await axios.get(`${BASE_URI}?beer_name=${value}`);
};

export const abvSearch = async () => {
  return await axios.get(`${BASE_URI}?abv_gt=6`);
};

export const ebcSearch = async () => {
  return await axios.get(`${BASE_URI}?ebc_gt=20`);
};

export const acidicSearch = async () => {
  return await axios.get(`${BASE_URI}`);
};
