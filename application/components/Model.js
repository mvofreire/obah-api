import { Model as SequelizeModel } from "sequelize";
import Database from "@app/database";

class Model extends SequelizeModel {
  static operators = Database.Op;

  constructor(values, options) {
    super(values, options);
  }

  static init(attributos = {}) {
    return super.init(attributos, {
      sequelize: Database,
      tableName: this.tableName,
      defaultScope: this.defaultScope(),
      scopes: this.scopes(),
      hooks: this.hooks(),
      syncOnAssociation: false,
      sync: { force: false },
      // ...options
    });
  }

  static defaultScope() {
    return {};
  }

  static scopes() {
    return {};
  }

  static hooks() {
    return {};
  }

  static filter() {
    return {};
  }
}

export default Model;
