import { loadValidStores } from "services/client";

const loadStores = async (req, res) => {
  try {
    const data = await loadValidStores();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default {
  loadStores,
};
