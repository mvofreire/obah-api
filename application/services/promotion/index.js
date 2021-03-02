import { Offer, OfferImage, Client } from "models";

export const loadValidPromotions = async () => {
  try {
    const data = await Offer.findAll({
      where:{
        status:true
      },
      include: [
        { model: OfferImage },
        { model: Client },
      ],
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
