import * as Redux from "redux";

import { loadTheme } from "../actions/creators";
import {
  SET_SETTINGS,
} from "../actions/types";


const themeMiddleware = ((store: Redux.MiddlewareAPI<any>) =>
                         (next: Redux.Dispatch<any>) =>
                         (action) => {
  switch (action.type) {
    case SET_SETTINGS:
      // If our settings has a theme, load that. Otherwise
      // load the default.
      if (action.settings && action.settings.theme) {
        store.dispatch(loadTheme(action.settings.theme));
      } else {
        store.dispatch(loadTheme(store.getState().settings.theme));
      }
      return next(action);

    default:
      return next(action);
  }
});

export default themeMiddleware;
