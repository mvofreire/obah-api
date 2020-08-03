import fs from "fs";
import path from "path";
import Database, { Sequelize as Datatypes } from "@app/database";

const basename = path.basename(__filename);
const db = Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)

    .filter(
      file =>
        file.indexOf(".") !== 0 &&
        file.indexOf(".js.map") === -1 &&
        file !== basename &&
        file !== "index.js"
    )

    .map(file => {
      const model = require(path.join(__dirname, file)).default || null;
      return {
        [model.name]: model.init(Datatypes)
      };
    })
);

Object.keys(db).forEach(modelName => {
  db[modelName].associate && db[modelName].associate(db);
});

Database.sync({ force: false });
db.Connection = Database;
module.exports = db;
