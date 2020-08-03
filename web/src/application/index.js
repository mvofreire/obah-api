import React, { Component, Suspense } from "react";
import { AppContext } from "contexts/app";
import { Route, Redirect, Switch } from "react-router-dom";

import PublicPage from "./containers/public";
import AuthenticatedPage from "./containers/authenticated";

import Identity from "util/identity";
import { checkStatus } from "services/system";

import { ThemeProvider } from "@material-ui/styles";

import theme from "config/theme";
import { ConfigProvider } from "antd";
import moment from "moment";

import ptBR from "antd/es/locale/pt_BR";
// import momentPtBr from "config/locale/ptBr-moment";

import Logo from "./logo";

import {
  getPublicMenus,
  getPrivateMenus,
  getPublicPages,
  getPrivatePages,
} from "./pages/utils";

moment.locale("pt-br");

class Application extends Component {
  constructor(p) {
    super(p);
    this.state = {
      identity: Identity.loadFromLocal(),
    };
  }

  componentDidMount() {
    this.checkStatus();
  }

  checkStatus = async () => {
    const data = await checkStatus();
    console.log(data);
  };

  setUserSession = (user) => {
    const identity = this.state.identity.setSession(user);
    this.setState({ identity });
  };

  logout = () => {
    const { identity } = this.state;
    identity.deleteSession();

    this.setState({
      identity: Identity.loadFromLocal(),
    });
  };

  loadMenus = () => {
    const { identity } = this.state;

    return identity.isGuest() ? getPublicMenus() : getPrivateMenus();
  };

  loadPages = () => {
    const { identity } = this.state;

    const pagesConfigs = identity.isGuest()
      ? getPublicPages()
      : getPrivatePages();

    return pagesConfigs;
  };

  render() {
    const { identity } = this.state;
    const isLogged = !identity.isGuest();

    const ComponentWrapper = !isLogged ? PublicPage : AuthenticatedPage;
    const menus = this.loadMenus();
    const pages = this.loadPages();

    return (
      <ConfigProvider locale={ptBR} componentSize="large">
        <ThemeProvider theme={theme}>
          <AppContext.Provider
            value={{
              ...this.state,
              setUserSession: this.setUserSession,
              logout: this.logout,
            }}
          >
            <ComponentWrapper menus={menus} logo={<Logo />}>
              <Switch>
                {pages.map((config) => (
                  <Route {...config} />
                ))}
                <Redirect to="/register" />
              </Switch>
            </ComponentWrapper>
          </AppContext.Provider>
        </ThemeProvider>
      </ConfigProvider>
    );
  }
}

export default Application;
