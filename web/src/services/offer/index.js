import request from "util/request";

export const loadMyOffers = async () => {
  return request.get("/client/offer");
};

export const createOffer = (data) => {
  return request.post("/client/offer", data);
};

export const updateOffer = (id, data) => {
  return request.put(`/client/offer/${id}`, data);
};

export const removeOffer = (id) => {
  return request.delete(`/client/offer/${id}`);
};
