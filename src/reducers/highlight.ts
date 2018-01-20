import _ = require("underscore");

import {
  ADD_HIGHLIGHTED_LINE,
  ADD_HIGHLIGHTED_LINES,
  GET_PASTE_FROM_URL,
  REDIRECT_TO_SUBMITTED_PASTE,
  SET_DECRYPTED_PASTE,
  SET_HIGHLIGHTED_LINES,
  SET_INITIAL_HIGHLIGHTED_LINES,
} from "../actions/types";

export interface IHighlightReducer {
  files: number[][];
}

const initial: IHighlightReducer = {
  files: [],
};


const highlight = (state: IHighlightReducer = initial, action) => {
  switch (action.type) {
    case GET_PASTE_FROM_URL:
      return {
        files: action.highlight,
      };

    case REDIRECT_TO_SUBMITTED_PASTE:
      return {
        files: action.paste.files.map(f => []),
      };

    case SET_DECRYPTED_PASTE:
      return {
        files: state.files.length ? state.files : action.paste.files.map(f => []),
      };

    case SET_INITIAL_HIGHLIGHTED_LINES:
    case SET_HIGHLIGHTED_LINES: {
      const newState = {
        files: [...state.files.map(lines => [...lines])],
      };
      newState.files[action.index] = [...action.lines];

      return newState;
    }

    case ADD_HIGHLIGHTED_LINE: {
      const newState = {
        files: [...state.files.map(lines => [...lines])],
      };

      if (!newState.files[action.index].includes(action.line)) {
        newState.files[action.index] = [
          ...state.files[action.index],
          action.line,
        ];
      } else {
        newState.files[action.index].splice(
          newState.files[action.index].indexOf(action.line), 1,
        );
      }

      return newState;
    }

    case ADD_HIGHLIGHTED_LINES: {
      const newState = {
        files: [...state.files.map(lines => [...lines])],
      };
      newState.files[action.index] = rangedSelection(
        state.files[action.index],
        action.lhs,
        action.rhs,
      );

      return newState;
    }

    default:
      return state;
  }
};

export default highlight;

export const rangedSelection = (original: number[], lhs: number, rhs: number): number[] => {
  const newRange: number[] = (lhs > rhs) ? _.range(rhs, lhs + 1) : _.range(lhs, rhs + 1);
  // Reverse the input before calling uniq. Uniq keeps the first occurrance and
  // removes any more. This allows the last clicked (last element) element to remain last.
  return _.uniq([
    ...original,
    ...newRange,
  ].reverse()).reverse();
};
