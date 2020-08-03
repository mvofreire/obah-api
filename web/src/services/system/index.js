import api from "util/request";

export const checkStatus = () => {
  return api.get("/system/status");
};
