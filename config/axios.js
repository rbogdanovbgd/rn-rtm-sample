import axios from 'axios';
import getStore from '../modules/store';

let instance = axios.create({
  baseURL: 'https://apin.vivook.com/v2',
  //baseURL: "https://apidevvivook.mctekk.com/v2"
});

instance.interceptors.request.use(
  function (config) {
    console.log(config);
    if (!config.url.includes('auth') && !config.url.includes('empleados') && !config.url.includes('admins') && !config.url.includes('tareastipo')) {
      const token = getStore().getState().session.token;
      if (!config.headers.Authorization) {
        config.headers.Authorization = token;
      }
      config.headers['Content-Type'] = 'application/json';
    } else if (config.url.includes('redirect')) {
      config.headers.Authorization = 'gRR65aNYfAFRC4JoZBlesZUdq268gvaTez8XLdnJyrg7KTAMNridh8yKtYnHknwgcDWGH';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

module.exports = instance;
