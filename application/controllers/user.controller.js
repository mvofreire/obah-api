import { User } from "models";

const me = (req, res) => {
  const me = req.appContext;

  res.json(me);
};

const addFavorite = async (req, res) => {
  try {
    const { id } = req.body;
    const { userSession } = req.appContext;

    const user = await User.findById(userSession.id);
    const result = await user.addFavorite(id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { userSession } = req.appContext;
    const user = await User.findById(userSession.id);
    const result = await user.removeFavorite(id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const favorites = async (req, res) => {
  try {
    const { userSession } = req.appContext;
    const user = await User.findById(userSession.id).populate(
      "saved.reference"
    );

    if (user) {
      res.json(user.saved);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const setConfig = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.appContext.userSession;
    const user = await User.findByPk(id);
    await user.setConfig(data);

    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getConfig = async (req, res) => {
  try {
    const { id } = req.appContext.userSession;
    const user = await User.findByPk(id);

    res.json(user.config);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getConfigValue = async (req, res) => {
  try {
    const { key } = req.params;

    const { id } = req.appContext.userSession;
    const user = await User.findByPk(id);

    const result = user.getConfig(key);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default {
  me,
  addFavorite,
  removeFavorite,
  favorites,
  setConfig,
  getConfig,
  getConfigValue
};
