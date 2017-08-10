import { Paste } from 'pasty-core'

import {
  GET_PASTE_FROM_URL,
  CLEAR_PASTE,
  DECRYPT_PASTE,
  SET_DECRYPTED_PASTE,
} from './types'


export const getPaste = (id: string, key: string, url: string) => ({
  type: GET_PASTE_FROM_URL,
  key,
  id,
  url,
});

export const clearPaste = (id: string) => ({
  type: CLEAR_PASTE,
  id,
});

export const decryptPaste = (id: string, key: string, data: string) => ({
  type: DECRYPT_PASTE,
  id,
  key,
  data
});

export const setDecryptedPaste = (id: string, paste: Paste) => ({
  type: SET_DECRYPTED_PASTE,
  id,
  paste
});
