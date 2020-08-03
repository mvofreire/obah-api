import ClientController from "../controllers/client.controller";
import multer from "multer";
import multerConfig from "config/multer";

export const ClientRoute = (app) => {
  app
    .route("/client/offer")
    .post(multer(multerConfig).single("file"), ClientController.createOffer)
    .get(ClientController.loadMyOffers);

  app
    .route("/client/offer/:id")
    .get(ClientController.detailOffer)
    .put(ClientController.updateOffer)
    .delete(ClientController.removeOffer);

  app.route("/client/email-exists").post(ClientController.checkIfEmailExists);
};
