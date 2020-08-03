import request from "util/request";

export const addFavorite = (id) => {
  return request.post("/user/favorite", { id });
};
export const removeFavorite = (id) => {
  return request.delete(`/user/favorite/${id}/remove`);
};

export const loadFavorites = (filters) => {
  return request.get("/user/list-favorites", filters);
};
