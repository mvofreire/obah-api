import { addFavorite, removeFavorite } from "services/user";
import config from "config";
import Storage from "util/storage";

export default class UserIDentity {
  session = {};

  constructor(user) {
    this.session = user;
  }

  static loadFromLocal() {
    const _session = Storage.get(config.userSessionKey);
    return new UserIDentity(_session);
  }

  setSession(session) {
    this.session = session;
    Storage.set(config.userSessionKey, this.session);
    return this;
  }

  getSession() {
    return this.session;
  }

  isGuest(){
    return this.session === null;
  }

  deleteSession() {
    this.session = {};
    Storage.remove(config.userSessionKey);
  }
}
