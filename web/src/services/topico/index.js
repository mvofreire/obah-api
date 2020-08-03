import request from "util/request";

export const searchTopicByName = name => {
  return request.get("/topicos/search", {
    limit: 4,
    name
  });
};

export const bindTopicToUser = async topic => {
  const data = await request.post(`/topicos/bind`, {
    topic
  });

  console.log(data);

  const status = false;
  const message = "";

  return Promise.resolve({ status, message });
};

export const loadUserTopics = _ => {
  return request.get("/topicos");
};
