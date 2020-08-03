import AuthController from "../controllers/auth.controller";

export const AuthRouter = (app) => {
  //user
  app.route("/login").post(AuthController.doLogin);
  app.route("/register").post(AuthController.doRegister);
  app.route("/login-facebook").post(AuthController.doLoginFacebook);
  app.route("/register-facebook").post(AuthController.doRegisterFacebook);
  app.route("/token").post(AuthController.refreshToken);

  // client
  app.route("/client/login").post(AuthController.doClientLogin);
  app.route("/client/register").post(AuthController.doClientRegister);

  app.route("/recovery").post(AuthController.recoveryPassword);
  app.route("/update-password").post(AuthController.updatePassword);
};
