import { Paste } from "pasty-core";

import {
  CLEAR_PASTE,
  DECRYPT_PASTE,
  GET_PASTE_FROM_URL,
  SET_DECRYPTED_PASTE,
} from "./types";


export const getPaste = (id: string, key: string, url: string) => ({
  id,
  key,
  type: GET_PASTE_FROM_URL,
  url,
});

export const clearPaste = (id: string) => ({
  id,
  type: CLEAR_PASTE,
});

export const decryptPaste = (id: string, key: string, data: string) => ({
  data,
  id,
  key,
  type: DECRYPT_PASTE,
});

export const setDecryptedPaste = (id: string, paste: Paste) => ({
  id,
  paste,
  type: SET_DECRYPTED_PASTE,
});
