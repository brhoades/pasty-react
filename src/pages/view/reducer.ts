import { Paste } from "pasty-core";

import {
  CLEAR_PASTE,
  DECRYPT_PASTE,
  ENCRYPT_THEN_SUBMIT_PASTE,
  GET_PASTE_FROM_URL,
  POST_PASTE_TO_URL,
  REDIRECT_TO_SUBMITTED_PASTE,
  SET_DECRYPTED_PASTE,
  SET_GENERAL_ERROR,
  SET_PASTE_PROGRESS,
} from "actions/types";
import Maybe from "helpers/maybe";

export enum STATE {
  WAITING,
  DECRYPTING,
  DOWNLOADING,
  VIEWING,
}

export interface IViewPasteReducer {
  state: STATE;
  id: string;
  key: string;
  paste: Maybe<Paste>;
  progress: number;
}

const initial: IViewPasteReducer = {
  id: "",
  key: "",
  paste: new Maybe<Paste>(null),
  progress: 0,
  state: STATE.WAITING,
};

const viewPaste = (state: IViewPasteReducer = initial, action) => {
  switch (action.type) {
    case GET_PASTE_FROM_URL:
      return {
        ...state,
        id: action.id,
        key: action.key,
        paste: new Maybe<Paste>(null),
        progress: 0,
        state: STATE.DOWNLOADING,
      };

    case CLEAR_PASTE:
      return {
        ...initial,
        state: STATE.WAITING,
      };

    case SET_DECRYPTED_PASTE:
      return {
        ...state,
        paste: new Maybe<Paste>(action.paste),
        state: STATE.VIEWING,
      };

    case DECRYPT_PASTE:
      return {
        ...state,
        progress: 0,
        state: STATE.DECRYPTING,
      };

    case SET_GENERAL_ERROR:
      return {
        ...state,
        state: STATE.WAITING,
      };

    case REDIRECT_TO_SUBMITTED_PASTE:
      return {
        id: action.id,
        key: action.key,
        paste: new Maybe<Paste>(action.paste),
        state: STATE.VIEWING,
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

export default viewPaste;
