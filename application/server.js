require("dotenv").config();
import path from "path";
import "@babel/polyfill/noConflict";
import "./middlewares/database";

import registerRoutes from "./middlewares/register-routes";
import registerSockets from "./middlewares/register-sockets";
import userSession from "./middlewares/user-session";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import morgan from "morgan";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(morgan("dev"));

registerSockets(server);
app.use(bodyParser.json());
app.use(
  "/static",
  express.static(path.join(__dirname, "..", "tmp", "uploads"))
);
app.use(userSession);
registerRoutes(app);

const SERVER_PORT = process.env.PORT;
server.listen(SERVER_PORT, function () {
  console.log(`ESCUTANDO NA PORTA ${SERVER_PORT}!`);
});
