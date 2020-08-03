import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { Menu, findMenuByPath } from "components";
import PropTypes from "prop-types";
const { Header, Content, Footer } = Layout;

class PublicPage extends Component {
  constructor(p) {
    super(p);
    const { location, menus } = this.props;
    this.state = {
      activeMenuKey: [findMenuByPath(location.pathname, menus).key],
    };
    this.unlistenHistory = null;
  }

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
      activeMenuKey: [key],
    });
  };

  onMenuClick = (item) => {
    const { history } = this.props;

    history.push(item.path);
  };

  render() {
    const { activeMenuKey } = this.state;
    const { children, menus, logo } = this.props;
    return (
      <Layout style={{ minWidth: 540 }}>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Row>
            <Col flex="100px">
              <Link to="/home">
                <div className="public-logo">{logo}</div>
              </Link>
            </Col>
            <Col flex="auto">
              <Row justify="end">
                <Menu
                  menuOptions={{
                    theme: "dark",
                    mode: "horizontal",
                    selectedKeys: activeMenuKey,
                    style: { lineHeight: "64px" },
                  }}
                  onClickMenu={this.onMenuClick}
                  menus={menus}
                />
              </Row>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            marginTop: 64,
            background: "#fff",
            minHeight: "calc(100vh - 133px)",
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>Obah</Footer>
      </Layout>
    );
  }
}

PublicPage.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      label: PropTypes.string,
      visible: PropTypes.bool,
      icon: PropTypes.string,
    })
  ).isRequired,
};

export default withRouter(PublicPage);
