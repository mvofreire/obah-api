import UserController from "../controllers/user.controller";

export const UserRouter = app => {
  app.route("/me").get(UserController.me);

  app.route("/config-value/:key").get(UserController.getConfigValue);

  app
    .route("/config")
    .get(UserController.getConfig)
    .post(UserController.setConfig);
};
