import { replace } from "react-router-redux";
import { Dispatch, MiddlewareAPI } from "redux";

import {
  REDIRECT_TO_SUBMITTED_PASTE,
} from "../actions/types";
import { IReducer } from "../reducers/index";


const redirectToNewPaste = ((store: MiddlewareAPI<any>) =>
                            (next: Dispatch<any>) =>
                            (action) => {
  switch (action.type) {
    case REDIRECT_TO_SUBMITTED_PASTE:
      const result = next(action);

      store.dispatch(replace(`/view/${encodeURI(action.id)}/${encodeURI(action.key)}`));
      return result;

    default:
      return next(action);
  }
});

export default redirectToNewPaste;
