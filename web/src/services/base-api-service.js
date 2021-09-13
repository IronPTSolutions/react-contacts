import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  withCredentials: true
})

http.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, 
  (error) => {
    const status = error?.response?.status;
    switch (status) {
      case 401:
        if (window.location.pathname !== "/signup" && window.location.pathname !== "/login") {
          localStorage.removeItem('user');
          window.location.replace('/login')
        }
        break;
      case 404:
        window.location.replace('/404');
        break;
      default:
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default http;
