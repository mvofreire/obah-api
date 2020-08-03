import React from "react";
import { Divider, Alert } from "antd";

export const LoginError = ({ description }) => (
  <>
    <Alert
      message="Houve um problema"
      description={description}
      type="error"
      showIcon
    />
    <Divider />
  </>
);
