import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://winereview-api.vercel.app/14-2',
});

export default axios;
