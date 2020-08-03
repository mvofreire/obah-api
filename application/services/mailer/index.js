import nodeMailer from "nodemailer";
import config from "config/main";
import Handlebars from "handlebars";
import fs from "fs";

import path from "path";
let mailer;

const defaultSender = "vinny.freire@gmail.com";
const loadFiles = ["html", "subject", "text"];

const initMailer = () => {
  mailer = nodeMailer.createTransport(config.email.server);

  return {
    send,
  };
};

const send = async ({ template, to, model, from = defaultSender }) => {
  const pathToTemplate = path.join(__dirname, "templates", template);
  const sourceContentFiles = loadFiles.map((file) =>
    fs.readFileSync(path.join(pathToTemplate, `${file}.hbs`), "utf-8")
  );

  const [html, subject, text] = sourceContentFiles.map((source) => {
    const tmpl = Handlebars.compile(source);
    return tmpl(model);
  });

  const config = {
    from,
    to,
    subject,
    html,
    text,
  };

  mailer.sendMail(config, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado");
    }
  });
};

export default initMailer();
