import { makeStyles } from "@material-ui/styles";
import { Types } from "./constants";

export default makeStyles(({ colors, font }) => {
  return {
    root: {},
    secondary: {
      background: colors.secondary,
    },
    action: {
      background: colors.action,
    },
  };
});
