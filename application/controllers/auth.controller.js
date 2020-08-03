import { User, Client } from "models";
import jwt from "jsonwebtoken";
import appConfig from "../config/main";
import mailer from "../services/mailer";

const tokenList = {};
const doLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findUserWithRolesAuthenticate(email, password);

    const token = jwt.sign(
      { id: usuario.id, type: "user" },
      appConfig.tokenSecret,
      {
        expiresIn: appConfig.tokenTimeExpiration,
      }
    );
    const refreshToken = jwt.sign(
      { id: usuario._id, type: "user" },
      appConfig.refreshTokenSecret,
      {
        expiresIn: appConfig.refreshTokenTimeExpiration,
      }
    );

    const response = {
      id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      saved: usuario.saved,
      token,
      refreshToken,
    };
    tokenList[refreshToken] = response;
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const doLoginFacebook = async (req, res) => {
  res.status(500).send("not implemented");
};

const refreshToken = (req, res) => {
  // refresh the damn token
  const postData = req.body;
  // if refresh token exists
  if (postData.refreshToken && postData.refreshToken in tokenList) {
    const decoded = jwt.verify(
      postData.refreshToken,
      appConfig.refreshTokenSecret
    );
    const token = jwt.sign({ id: decoded.id }, appConfig.tokenSecret, {
      expiresIn: appConfig.tokenTimeExpiration,
    });
    const response = {
      token: token,
    };
    // update the token in the list
    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
};

const doRegister = async (req, res) => {
  const data = req.body;

  try {
    const usuario = await User.createNewUser(data);
    return res.status(200).send(usuario);
  } catch (e) {
    console.log(e);

    res.status(500).send("Erro ao criar usuario");
  }
};
const doRegisterFacebook = async (req, res) => {
  res.status(500).send("not implemented");
};

const doClientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findClientWithRolesAuthenticate(
      email,
      password
    );

    const token = jwt.sign(
      { id: client.id, type: "client" },
      appConfig.tokenSecret,
      {
        expiresIn: appConfig.tokenTimeExpiration,
      }
    );
    const refreshToken = jwt.sign(
      { id: client._id, type: "client" },
      appConfig.refreshTokenSecret,
      {
        expiresIn: appConfig.refreshTokenTimeExpiration,
      }
    );

    const response = {
      id: client._id,
      name: client.name,
      email: client.email,
      saved: client.saved,
      token,
      refreshToken,
    };
    tokenList[refreshToken] = response;
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const doClientRegister = async (req, res) => {
  const data = req.body;

  try {
    const model = await Client.createNewClient(data);
    return res.status(200).send(model);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro ao criar client");
  }
};

const recoveryPassword = async (req, res) => {
  const { email } = req.body;
  const model = await Client.findOne({ where: { email } });
  if (!!model) {
    model.startProcessRecoveryPassword();
  }
  res.status(200).send();
};

const updatePassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;
  try {
    const model = await Client.findOne({
      where: { recovery_password_token: token },
    });
    if (!!model) {
      await model.endProcessRecoveryPassword(token, password, confirmPassword);
      res.status(200).send("Senha alterada");
    } else {
      res.status(404).send("Token não encontrado!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
  doLogin,
  doLoginFacebook,
  doRegister,
  doRegisterFacebook,
  refreshToken,
  doClientLogin,
  doClientRegister,

  recoveryPassword,
  updatePassword,
};
