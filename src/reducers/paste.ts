import { Paste } from "pasty-core";

import {
  CLEAR_PASTE,
  DECRYPT_PASTE,
  GET_PASTE_FROM_URL,
  SET_DECRYPTED_PASTE,
} from "../actions/types";
import Maybe from "../monads/maybe";

export enum STATE {
  WAITING,
  DOWNLOADING,
  DECRYPTING,
  VIEWING,
}

export interface IPasteReducer {
  downloadState: STATE;
  id: string;
  key: string;
  paste: Maybe<Paste>;
}

const initial: IPasteReducer = {
  downloadState: STATE.WAITING,
  id: "",
  key: "",
  paste: null,
};

const paste = (state: IPasteReducer = initial, action) => {
  switch (action.type) {
    case GET_PASTE_FROM_URL:
      return {
        ...state,
        downloadState: STATE.DOWNLOADING,
        id: action.id,
        key: action.key,
        paste: new Maybe<Paste>(null),
      };

    case CLEAR_PASTE:
      return {
        ...state,
        downloadState: STATE.WAITING,
        id: "",
        key: "",
        paste: new Maybe<Paste>(null),
      };
    case SET_DECRYPTED_PASTE:
      return {
        ...state,
        downloadState: STATE.VIEWING,
        paste: new Maybe<Paste>(action.paste),
      };

    case DECRYPT_PASTE:
      return {
        ...state,
        downloadState: STATE.DECRYPTING,
      };

    default:
      return state;
  }
};

export default paste;
