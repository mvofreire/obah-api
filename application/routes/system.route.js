export const SystemRouter = app => {

  app.route("/").get((req, res) => res.send("obah api"));
  app.route("/system/status").get((req, res) => res.send("system is ok"));

};
