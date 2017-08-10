import { Paste } from 'pasty-core'

import {
  DECRYPT_PASTE,
  SET_DECRYPTED_PASTE,
  GET_PASTE_FROM_URL,
} from '../actions/types'

enum STATE {
  WAITING,
  DOWNLOADING,
  DECRYPTING,
  VIEWING
}

export interface PasteReducer {
  downloadState: STATE,
  id: string,
  key: string,
  paste: Paste | null
}

const initial: PasteReducer = {
  downloadState: STATE.WAITING,
  id: '',
  key: '',
  paste: null
};

const paste = (state: PasteReducer = initial, action) => {
  switch (action.type) {
    case GET_PASTE_FROM_URL:
      return {
        ...state,
        downloadState: STATE.DOWNLOADING,
        id: action.id,
        key: action.key,
        paste: null
      };

    case SET_DECRYPTED_PASTE:
      return {
        ...state,
        paste: action.paste,
        downloadedState: STATE.VIEWING
      };

    case DECRYPT_PASTE:
      return {
        ...state,
        downloadState: STATE.DECRYPTING
      };

    default:
      return state
  }
}

export default paste;
