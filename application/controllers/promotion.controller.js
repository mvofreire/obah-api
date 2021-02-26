const data = [
  {
    id: 1,
    title: "Promotion 1",
  },
  {
    id: 2,
    title: "Promotion 2",
  },
  {
    id: 3,
    title: "Promotion 3",
  },
  {
    id: 4,
    title: "Promotion 4",
  },
];

const loadPromotions = async (req, res) => {
  res.json(data);
};

export default {
  loadPromotions,
};
