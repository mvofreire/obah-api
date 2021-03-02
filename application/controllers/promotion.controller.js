import { loadValidPromotions } from "services/promotion";

const loadPromotions = async (req, res) => {
  const data = await loadValidPromotions();
  res.json(data);
};

export default {
  loadPromotions,
};
