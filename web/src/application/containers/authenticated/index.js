import React, { PureComponent } from "react";
import { Layout } from "antd";
import { withRouter, Link } from "react-router-dom";
import { AppContext } from "contexts/app";
import { Menu, findMenuByPath } from "components";
import { Modal } from "antd";
import HeaderAdmin from "./header";

const { Header, Sider, Content } = Layout;

class AuthenticatedPage extends PureComponent {
  static contextType = AppContext;

  constructor(p) {
    super(p);
    const { location, menus } = this.props;
    this.state = {
      activeMenuKey: [findMenuByPath(location.pathname, menus).key],
      modalVisible: false,
      collapsed: true,
    };
    this.unlistenHistory = null;
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
    });
  };

  componentDidMount() {
    const { history } = this.props;
    this.unlistenHistory = history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this.unlistenHistory && this.unlistenHistory();
  }

  handleLocationChange = ({ pathname }) => {
    const { menus } = this.props;
    const menu = findMenuByPath(pathname, menus);

    if (menu.isAnonymousPage == false && !!menu) {
      const { key } = menu;
      this.setActiveMenu(key);
    }
  };

  setActiveMenu = (key) => {
    this.setState({
      activeMenuKey: typeof key === "undefined" ? [""] : [key],
    });
  };

  onLogoutClick = () => {
    console.log("logout");
    this.setState({
      modalVisible: true,
    });
  };

  onLogout = () => {
    const { history } = this.props;
    history.entries = [];
    history.index = -1;
    this.context.logout();
    history.push("/login");
  };

  goTo = (route) => () => {
    const { history } = this.props;
    history.push(`/admin/${route}`);
  };

  onClickMenu = (item) => {
    const { history } = this.props;

    history.push(item.path);
  };

  render() {
    const { activeMenuKey, modalVisible } = this.state;
    const { children, menus, logo } = this.props;

    return (
      <React.Fragment>
        <Layout>
          <Sider
            onCollapse={this.onCollapse}
            // collapsible
            collapsed={false}
          >
            <Link to="/admin/dashboard">
              <div className="logo">{logo}</div>
            </Link>
            <Menu
              menus={menus}
              onClickMenu={this.onClickMenu}
              menuOptions={{
                selectedKeys: activeMenuKey,
              }}
            />
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0, display: "flex" }}>
              <div style={{ width: "100%" }}>
                <HeaderAdmin
                  onLogoutClick={this.onLogoutClick}
                  goTo={this.goTo}
                />
              </div>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: "calc(100vh - 112px)",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
        <Modal
          title="=("
          centered
          visible={modalVisible}
          onOk={this.onLogout}
          onCancel={() => this.setState({ modalVisible: false })}
        >
          <p>Deseja realmente sair do sistema?</p>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(AuthenticatedPage);
