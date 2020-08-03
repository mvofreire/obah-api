import axios from "axios";
import Storage from "util/storage";
import appConfig from "config";
import history from "util/history";

let instance;
const createInstance = () => {
  const instance = axios.create({
    baseURL: appConfig.baseUrl,
    timeout: 30000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return instance;
};

const getUser = () => {
  return Storage.get(appConfig.userSessionKey) || {};
};

const setUserSession = (session) => {
  Storage.set(appConfig.userSessionKey, session);
};

const addInterceptors = (instance) => {
  instance.interceptors.request.use(
    function (config) {
      // validar se esta logado
      if (getUser().token !== null) {
        const token = getUser().token;
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      const originalRequest = error.config;
      if (error.code != "ECONNABORTED" && error.response.status === 401) {
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          const user = getUser();
          return instance
            .post("/token", {
              refreshToken: user.refreshToken,
              clientId: "website",
            })
            .then((response) => {
              setUserSession({
                ...user,
                token: response.token,
              });
              return instance(originalRequest);
            });
        } else {
          history.entries = [];
          history.index = -1;
          history.push("/login");
        }
      }
      return Promise.reject(error);
    }
  );
};

const request = () => {
  instance = createInstance();

  addInterceptors(instance);

  return {
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
};

const get = (endpoint, params) => instance.get(endpoint, { params });
const post = (endpoint, params) => instance.post(endpoint, params);
const put = (endpoint, params) => instance.put(endpoint, params);
const _delete = (endpoint, params) => instance.delete(endpoint, params);
const patch = (endpoint, params) => instance.patch(endpoint, params);

export default request();
