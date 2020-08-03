import React from "react";
import { Spin } from "antd";

const Loading = ({ show, ...rest }) => {
  return <Spin size="large" spinning={show} {...rest} />;
};

Loading.defaultProps = {
  show: false,
};

export { Loading };
