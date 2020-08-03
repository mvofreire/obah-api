import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";

import { Button } from ".";
import { Types } from "./constants";
export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs],
};

export const Default = () => (
  <Button
    onClick={action("clicked")}
    type={select("type", Types, Types.primary)}
    disabled={boolean("disabled", false)}
  >
    {text("text", "Hello Button")}
  </Button>
);
