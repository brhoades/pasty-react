import { Paste } from "pasty-core";

import {
  CLEAR_PASTE,
  ENCRYPT_THEN_SUBMIT_PASTE,
  POST_PASTE_TO_URL,
  REDIRECT_TO_SUBMITTED_PASTE,
  SET_DECRYPTED_PASTE,
  SET_GENERAL_ERROR,
  SET_PASTE_PROGRESS,
} from "actions/types";
import Maybe from "helpers/maybe";

export enum STATE {
  WAITING,
  ENCRYPTING,
  UPLOADING,
}

export interface ICreatePasteReducer {
  state: STATE;
  progress: number;
}

const initial: ICreatePasteReducer = {
  progress: 0,
  state: STATE.WAITING,
};

const createPaste = (state: ICreatePasteReducer = initial, action) => {
  switch (action.type) {
    case POST_PASTE_TO_URL:
      return {
        ...initial,
        state: STATE.UPLOADING,
      };

    case CLEAR_PASTE:
      return {
        ...initial,
      };

    case REDIRECT_TO_SUBMITTED_PASTE:
    case SET_DECRYPTED_PASTE:
      return {
        ...initial,
      };

    case ENCRYPT_THEN_SUBMIT_PASTE:
      return {
        ...initial,
        state: STATE.ENCRYPTING,
      };

    case SET_GENERAL_ERROR:
      return {
        ...state,
        state: STATE.WAITING,
      };

    case SET_PASTE_PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };

    default:
      return state;
  }
};

export default createPaste;
