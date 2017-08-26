import { Paste } from "pasty-core";

import {
  CLEAR_PASTE,
  DECRYPT_PASTE,
  ENCRYPT_THEN_SUBMIT_PASTE,
  GET_PASTE_FROM_URL,
  POST_PASTE_TO_URL,
  REDIRECT_TO_SUBMITTED_PASTE,
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
  id: "",
  key: "",
  paste: new Maybe<Paste>(null),
  state: STATE.WAITING,
};

const paste = (state: IPasteReducer = initial, action) => {
  switch (action.type) {
    case GET_PASTE_FROM_URL:
      if (state.id === action.id && state.key === action.key && state.state === STATE.VIEWING) {
        return {
          ...state
        };
      }

      return {
        ...state,
        id: action.id,
        key: action.key,
        paste: new Maybe<Paste>(null),
        state: STATE.DOWNLOADING,
      };

    case POST_PASTE_TO_URL:
      return {
        ...initial,
        state: STATE.UPLOADING,
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

    case ENCRYPT_THEN_SUBMIT_PASTE:
      return {
        ...initial,
        state: STATE.ENCRYPTING,
      };

    case DECRYPT_PASTE:
      return {
        ...state,
        state: STATE.DECRYPTING,
      };

    case REDIRECT_TO_SUBMITTED_PASTE:
      return {
        ...state,
        id: action.id,
        key: action.key,
        paste: new Maybe<Paste>(action.paste),
        state: STATE.VIEWING,
      };

    default:
      return state;
  }
};

export default paste;
