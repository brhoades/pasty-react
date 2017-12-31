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

export enum STATE_MESSAGES {
  "",
  "Encrypting",
  "Decrypting",
  "Uploading",
  "Downloading",
  " ",
}

export interface IPasteReducer {
  state: STATE;
  id: string;
  key: string;
  paste: Maybe<Paste>;
  progress: number;
  stateMessage: string;
}

const initial: IPasteReducer = {
  id: "",
  key: "",
  paste: new Maybe<Paste>(null),
  progress: 0,
  state: STATE.WAITING,
  stateMessage: STATE_MESSAGES[STATE.WAITING],
};

const paste = (state: IPasteReducer = initial, action) => {
  switch (action.type) {
    case GET_PASTE_FROM_URL:
      return {
        ...state,
        id: action.id,
        key: action.key,
        paste: new Maybe<Paste>(null),
        progress: 0,
        state: STATE.DOWNLOADING,
        stateMessage: STATE_MESSAGES[STATE.DOWNLOADING],
      };

    case POST_PASTE_TO_URL:
      return {
        ...initial,
        state: STATE.UPLOADING,
        stateMessage: STATE_MESSAGES[STATE.UPLOADING],
      };

    case CLEAR_PASTE:
      return {
        ...initial,
        state: STATE.WAITING,
        stateMessage: STATE_MESSAGES[STATE.WAITING],
      };

    case SET_DECRYPTED_PASTE:
      return {
        ...state,
        paste: new Maybe<Paste>(action.paste),
        state: STATE.VIEWING,
        stateMessage: STATE_MESSAGES[STATE.VIEWING],
      };

    case ENCRYPT_THEN_SUBMIT_PASTE:
      return {
        ...initial,
        state: STATE.ENCRYPTING,
        stateMessage: STATE_MESSAGES[STATE.ENCRYPTING],
      };

    case DECRYPT_PASTE:
      return {
        ...state,
        state: STATE.DECRYPTING,
        stateMessage: STATE_MESSAGES[STATE.DECRYPTING],
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
        stateMessage: STATE_MESSAGES[STATE.VIEWING],
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

export default paste;
