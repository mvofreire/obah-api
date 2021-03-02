import { Client } from "models";

export const loadValidStores = async () => {
  const data = await Client.findAll();

  return data;
};

export const updateClientInfo = async (clientId, data) => {
  const client = await Client.findByPk(clientId);
  return client.update(data);
};
