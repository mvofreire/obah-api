import { Offer, Client } from "models";

const createOffer = async (req, res) => {
  const data = req.body;
  console.log(req.file);
  const client_id = await req.appContext.id;
  const offer = await Offer.create({
    ...data,
    owner_id: client_id,
    status: true,
  });
  return res.json(offer);
};

const loadMyOffers = async (req, res) => {
  const clientSession = await req.appContext.session();
  const offers = await Offer.findAll({
    where: {
      owner_id: clientSession.id,
      status: true,
    },
  });
  res.json(offers);
};
const detailOffer = async (req, res) => {
  const { id } = req.params;

  try {
    const model = await Offer.findByPk(id);
    if (model) {
      res.json(model);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeOffer = async (req, res) => {
  const { id } = req.params;

  try {
    const model = await Offer.findByPk(id);
    model.update({ status: false });
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateOffer = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const model = await Offer.findByPk(id);
    model.update(data);
    res.json(model);
  } catch (error) {
    res.status(500).send(error);
  }
};

const checkIfEmailExists = async (req, res) => {
  const { email } = req.body;
  const count = await Client.count({ where: { email } });

  if (count > 0) {
    res.status(200).send("ok");
  } else {
    res.status(404).send();
  }
};

export default {
  createOffer,
  loadMyOffers,
  detailOffer,
  removeOffer,
  updateOffer,
  checkIfEmailExists,
};
