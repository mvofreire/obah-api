import Model from "components/Model";

class OfferImage extends Model {
  static tableName = "offer_image";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      key: { type: DataTypes.STRING(255) },
      path: { type: DataTypes.STRING(255) },
      originalname: { type: DataTypes.STRING(255) },
      encoding: { type: DataTypes.STRING(255) },
      mimetype: { type: DataTypes.STRING(255) },
      destination: { type: DataTypes.STRING(255) },
      filename: { type: DataTypes.STRING(255) },
      size: { type: DataTypes.INTEGER() },

      //virtual
      publicPath: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return `http://localhost:5000/static/${this.filename}`;
        },
      },
      thumbnail: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return `http://localhost:5000/static/thumb/${this.filename}`;
        },
      },
    });
  }

  static associate({ Offer }) {
    this.belongsTo(Offer);
  }
}

export default OfferImage;
