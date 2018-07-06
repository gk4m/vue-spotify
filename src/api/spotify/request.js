import axios from 'axios';

const request = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

export default request;
