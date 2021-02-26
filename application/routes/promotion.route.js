import PromotionController from "../controllers/promotion.controller";

export const PromotionRoute = (app) => {
  app.route("/promotion").get(PromotionController.loadPromotions);
};
