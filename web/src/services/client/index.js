import request from "util/request";

export const checkIfEmailExists = (email) => {
  return request.post("/client/email-exists", { email });
};
