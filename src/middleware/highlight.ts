import { replace } from "react-router-redux";
import * as Redux from "redux";

import { loadTheme } from "../actions/creators";
import {
  ADD_HIGHLIGHTED_LINE,
  ADD_HIGHLIGHTED_LINES,
  SET_HIGHLIGHTED_LINES,
} from "../actions/types";
import { IReducer } from "../reducers/index";


// return comma-separated string of ranges... ie:
// 21-30, 10-16, 3, 4
// for all highlighted line number
export function serializeLineNumbers(lines: number[]): string {
  return lines.sort().reduce((acc: number[][], e: number) => {
    // start
    if (acc.length === 0) {
      return [[e]];
    }

    const lastArray: number[] = acc[acc.length - 1];
    const lastArrayE: number = lastArray[lastArray.length - 1];

    if (lastArrayE + 1 === e) {
      return [...acc.slice(0, -1), [...lastArray, e]];
    }

    return [...acc, [e]];
  }, []).reduce((acc: string[], e: number[]) => {
    if (e.length > 1) {
      return [...acc, `${e[0] + 1}-${e[e.length - 1] + 1}`];
    }

    return [...acc, `${e[0] + 1}`];
  }, []).join(",");
}

// Generate a paste url from reducers
export function generatePasteURL(reducer: IReducer): string {
  const id: string = reducer.paste.id;
  const key: string = reducer.paste.key;

  if (reducer.highlight.files.filter((f) => f.length > 0).length === 0) {
    return `/view/${id}/${key}`;
  }

  const ranges: string = reducer.highlight.files.map(
    (f) => [...f].sort((a, b) => b - a),
  ).map(serializeLineNumbers).join(";");

  return `/view/${id}/${key}/${ranges}`;
}

const highlightMiddleware = ((store: Redux.MiddlewareAPI<any>) =>
                         (next: Redux.Dispatch<any>) =>
                         (action) => {
  switch (action.type) {
    case ADD_HIGHLIGHTED_LINE:
    case ADD_HIGHLIGHTED_LINES:
    case SET_HIGHLIGHTED_LINES:
      // run after the action
      const result = next(action);

      const currentPath: string = store.getState().router.location.pathname;
      const newPath: string = generatePasteURL(store.getState());

      if (currentPath !== newPath) {
        store.dispatch(replace(newPath));
      }
      return result;

    default:
      return next(action);
  }
});

export default highlightMiddleware;
