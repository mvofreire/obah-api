const loadStores = async (req, res) => {
  try {
    res.json([]).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default {
  loadStores
};