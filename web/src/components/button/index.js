import React from "react";
import clsx from "clsx";
import { Button as AntButton } from "antd";
import { Types } from "./constants";
import useStyles from "./styles";
import PropTypes from "prop-types";

const Button = ({ type, children, disabled, className, ...props }) => {
  const classes = useStyles({ type, disabled });

  return (
    <AntButton
      className={clsx(
        {
          [classes.secondary]: type === Types.secondary,
          [classes.action]: type === Types.action,
        },
        classes.root,
        className
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </AntButton>
  );
};

Button.Types = Types;

Button.propTypes = {
  type: PropTypes.oneOf(Object.values(Types)),
};

Button.defaultProps = {
  type: Types.primary,
};

export { Button };
