import axios from "axios";

const makeRequest = () => {
  return axios.create({
    // baseURL: `http://localhost:8000/api`
    baseURL: `http://kidsnparty.com.au/roben_api/groupon/public/api`
    // baseURL: `http://localhost/groupon_api/public/api`
  });
};

const request = makeRequest();

export default request;
