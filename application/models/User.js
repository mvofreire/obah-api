import bcrypt from "bcryptjs";
import Model from "components/Model";
import { USER_COMPLETE_PROFILE } from "constants";

class User extends Model {
  static tableName = "user";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      completeProfile: {
        type: DataTypes.ENUM,
        values: Object.values(USER_COMPLETE_PROFILE),
      },
      facebook: { type: DataTypes.STRING(255) },
      config: {
        type: DataTypes.JSONB,
      },
    });
  }

  setConfig(data) {
    this.config = data;
    return this.save();
  }

  getConfig(key) {
    return this.config[key] || null;
  }

  static associate({ Event }) {
    this.hasMany(Event, {
      as: "myEvents",
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }

  static async createNewUser({ password, ...data }) {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const usuario = await this.create({
      ...data,
      password: hashedPassword,
      completeProfile: USER_COMPLETE_PROFILE.INCOMPLETE,
    });
    return usuario;
  }

  static async findUserWithRolesAuthenticate(email, password) {
    const usuario = await this.findOne({
      where: { email },
    });

    if (!usuario) {
      throw "Usuario não encontrado";
    }
    if (!!usuario && bcrypt.compareSync(password, usuario.password)) {
      return usuario;
    } else {
      throw "E-mail ou senha estão incorretos";
    }
  }

  static async findUserByFacebook(facebookID) {
    return this.findOne({ where: { facebook: facebookID } });
  }
}

export default User;
