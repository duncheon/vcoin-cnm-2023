import axios from 'axios';
import config from '../config/config';

const beURL = config.backend_url;
const getBlocks = async (page) => {
  const result = await axios.get(`${beURL}/blocks/?page=${page}`);

  return result.data;
};
const blockServices = {
  getBlocks,
};

export default blockServices;
