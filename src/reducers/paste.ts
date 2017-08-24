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
  ENCRYPTING,
  DECRYPTING,
  UPLOADING,
  DOWNLOADING,
  VIEWING,
}

export interface IPasteReducer {
  state: STATE;
  id: string;
  key: string;
  paste: Maybe<Paste>;
}

const initial: IPasteReducer = {
  state: STATE.WAITING,
  id: "",
  key: "",
  paste: null,
};

const paste = (state: IPasteReducer = initial, action) => {
  switch (action.type) {
    case GET_PASTE_FROM_URL:
      return {
        ...state,
        state: STATE.DOWNLOADING,
        id: action.id,
        key: action.key,
        paste: new Maybe<Paste>(null),
      };

    case CLEAR_PASTE:
      return {
        ...state,
        state: STATE.WAITING,
        id: "",
        key: "",
        paste: new Maybe<Paste>(null),
      };
    case SET_DECRYPTED_PASTE:
      return {
        ...state,
        state: STATE.VIEWING,
        paste: new Maybe<Paste>(action.paste),
      };

    case DECRYPT_PASTE:
      return {
        ...state,
        state: STATE.DECRYPTING,
      };

    default:
      return state;
  }
};

export default paste;
