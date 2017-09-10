import {
  GET_PASTE_FROM_URL,
} from '../actions/types';

export interface PasteReducer {
};

const paste = (state: PasteReducer = {}, action) => {
  switch (action.type) {
    case GET_PASTE_FROM_URL:
      return state
    default:
      return state
  }
}

export default paste;
