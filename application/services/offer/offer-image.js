import { OfferImage } from "models";

export const createNewOfferImage = async (data) => {
  return OfferImage.create(data);
};
