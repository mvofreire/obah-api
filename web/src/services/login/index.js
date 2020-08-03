import request from "util/request";

export const doLogin = (credentials) => {
  return request.post("/client/login", credentials);
};

export const recoveryMyPassword = (email) => {
  return request.post("/recovery", { email });
};

export const updateMyPassword = (token, password, confirmPassword) => {
  return request.post("/update-password", { token, password, confirmPassword });
};
