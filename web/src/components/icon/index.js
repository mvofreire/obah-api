import React from "react";
import * as ListIcons from "@ant-design/icons";
import theme from "config/theme";

export const Icon = ({ name, size = null, color = null, ...rest }) => {
  const ComponentIcon = name in ListIcons ? ListIcons[name] : null;

  let styles = {};
  if (!!size) {
    styles.fontSize = size;
  }
  if (!!color) {
    styles.color = color;
  }

  return ComponentIcon !== null && <ComponentIcon {...rest} style={styles} />;
};
