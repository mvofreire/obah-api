import Model from "components/Model";
import bcrypt from "bcryptjs";
import mailer from "services/mailer";
import moment from "moment";
import config from "config/main";

class Client extends Model {
  static tableName = "client";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(), allowNull: false },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      accept_term: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      active: { type: DataTypes.BOOLEAN },
      recovery_password_token: {
        type: DataTypes.STRING(255),
      },
    });
  }

  static associate({ Offer, OfferProgram }) {
    this.hasMany(Offer, {
      as: "offers",
      foreignKey: "owner_id",
      sourceKey: "id",
    });
  }

  static async createNewClient({ password, ...data }) {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const model = await this.create({
      ...data,
      password: hashedPassword,
    });
    return model;
  }

  static async findClientWithRolesAuthenticate(email, password) {
    const model = await this.findOne({
      where: { email },
    });

    if (!model) {
      throw "Cliente não encontrado";
    }
    if (!!model && bcrypt.compareSync(password, model.password)) {
      return model;
    } else {
      throw "E-mail ou senha estão incorretos";
    }
  }

  async startProcessRecoveryPassword() {
    const time = moment().unix();
    const id = this.id;
    const info = [time, id].join("-");
    const email = this.email;
    const token = Buffer.from(info).toString("base64");

    await this.update({
      recovery_password_token: token,
    });
    return mailer.send({
      template: "recovery-password",
      to: email,
      model: {
        link: [process.env.APP_URL, "update-password", token].join("/"),
      },
    });
  }

  async endProcessRecoveryPassword(token, password, confirmPassword) {
    if (token !== this.recovery_password_token) {
      throw "Token inválido";
    }

    const tokenDecoded = Buffer.from(token, "base64").toString("ascii");
    const [time, id] = tokenDecoded.split("-");

    if (parseInt(id) !== parseInt(this.id)) {
      throw "Usuario não autorizado";
    }

    const { minutesToExpireRecoveryToken } = config.email;
    const generateTime = moment.unix(time);
    const timeToCheck = moment().diff(generateTime, "minutes");
    const timeExpired = timeToCheck > minutesToExpireRecoveryToken;
    if (timeExpired) {
      throw "Time Expired";
    }

    if (confirmPassword !== password) {
      throw "Senhas Diferentes";
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    return this.update({
      recovery_password_token: null,
      password: hashedPassword,
    });
  }
}

export default Client;
