import React from "react";
import { Menu as AntMenu } from "antd";
import Proptype from "prop-types";
import { Icon } from "components";
import theme from "config/theme";
export const findMenuByKey = (key, menus) => {
  const search = menus.filter((menu) => menu.key === key);
  return search.length > 0 ? search[0] : {};
};

export const findMenuByPath = (path, menus) => {
  const search = menus.filter((menu) => menu.path === path);
  return search.length > 0 ? search[0] : menus[0];
};

const Menu = ({ menuOptions, onClickMenu, menus }) => {
  const _clickMenu = (item) => {
    const _item = findMenuByKey(item.key, menus);
    onClickMenu && onClickMenu({ ...item, ..._item });
  };

  return (
    <AntMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      {...menuOptions}
      onClick={_clickMenu}
    >
      {menus
        .filter((item) => !!item.label)
        .map((menu, i) => (
          <AntMenu.Item key={menu.key}>
            {menu.icon && <Icon name={menu.icon} color={theme.colors.light} />}
            <span>{menu.label}</span>
          </AntMenu.Item>
        ))}
    </AntMenu>
  );
};

Menu.propTypes = {
  menus: Proptype.arrayOf(
    Proptype.shape({
      key: Proptype.string.isRequired,
      path: Proptype.string.isRequired,
      icon: Proptype.string,
      label: Proptype.string,
    })
  ).isRequired,
};

Menu.defaultProps = {
  menuOptions: {},
  onClickMenu: () => {},
};

export { Menu };
