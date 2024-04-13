import axios from 'axios';

const url = 'http://localhost:5000';

const httpClient = axios.create({
  baseURL: url,
});

httpClient.defaults.headers.post['Content-Type'] = 'application/json';

export default httpClient;
