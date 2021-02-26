import StoreController from "../controllers/store.controller";

export const StoreRoute = (app) => {
  app.route("/store").get(StoreController.loadStores);
};
