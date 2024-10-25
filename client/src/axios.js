import axios from "axios";
const instance = axios.create({
  baseURL: "https://sv.korea-chat.com/api",
});
instance.interceptors.request.use(
  function (config) {
    console.log(JSON.parse(window.localStorage.getItem("persist:auth"))?.token);

    const token =
      window.localStorage.getItem("persist:auth") &&
      JSON.parse(window.localStorage.getItem("persist:auth"))?.token.slice(
        1,
        -1
      );
    config.headers = { authorization: `Bearer ${token}` };
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data;
  }
);
export default instance;
