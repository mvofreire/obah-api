import Model from "components/Model";

class Offer extends Model {
  static tableName = "offer";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING(255) },
      subtitle: { type: DataTypes.STRING(255) },
      description: { type: DataTypes.TEXT },
      start_date: { type: DataTypes.DATE },
      end_date: { type: DataTypes.DATE },
      config: {
        type: DataTypes.JSONB,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
  }

  static associate({ Client, Event }) {

  }
}

export default Offer;
