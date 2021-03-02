import { Offer, Client } from "models";
import { createNewOfferImage } from "../services/offer/offer-image";
import { offerCreate, loadActiveOfferByClient } from "../services/offer";
import { updateClientInfo } from "../services/client";

//Client
const updateClient = async (req, res) => {
  try {
    const { filename } = req.file;
    const client_id = await req.appContext.id;
    
    const result = await updateClientInfo(client_id, {
      logo: filename,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

//Offers
const createOffer = async (req, res) => {
  const data = req.body;
  const client_id = await req.appContext.id;
  const offer = await offerCreate(client_id, data, req.files);

  return res.json(offer);
};

const loadMyOffers = async (req, res) => {
  const clientSession = await req.appContext.session();
  const offers = await loadActiveOfferByClient(clientSession.id);
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

const uploadImageOffer = async (req, res) => {
  try {
    const image = await createNewOfferImage(req.file);
    res.json(image);
  } catch (error) {
    console.log(error);
    req.sendStatus(500);
  }
};

export default {
  createOffer,
  loadMyOffers,
  detailOffer,
  removeOffer,
  updateOffer,
  checkIfEmailExists,
  uploadImageOffer,

  updateClient,
};
