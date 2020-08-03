import Model from "components/Model";
import { EVENT_TYPES } from "constants";

class Event extends Model {
  static tableName = "event";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING(255), allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      type: {
        type: DataTypes.ENUM,
        values: Object.values(EVENT_TYPES),
        allowNull: false,
      },
      views: { type: DataTypes.INTEGER },
      metadata: { type: DataTypes.JSONB, default: "{}" },
    });
  }

  static associate({ User }) {

  }
}

export default Event;
