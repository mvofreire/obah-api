import * as Routes from "../routes";

export default app => {
  Object.keys(Routes).map(key => {
    Routes[key](app);
  });
};
