import { Offer } from "models";
import { createNewOfferImage } from "./offer-image";

export const offerCreate = async (client, data, files = []) => {
  const offer = await Offer.create({
    ...data,
    status: true,
    ClientId: client,
  });

  if (files.length > 0) {
    files.forEach((file) =>
      createNewOfferImage({ ...file, OfferId: offer.id })
    );
  }

  return offer;
};

export const loadActiveOfferByClient = async (client) => {
  return await Offer.findAll({
    where: {
      ClientId: client,
      status: true,
    },
  });
};
