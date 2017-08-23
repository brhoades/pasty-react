import { Paste } from "pasty-core";
import { ISettings } from "../reducers/settings";

import {
  ADD_HIGHLIGHTED_LINE,
  ADD_HIGHLIGHTED_LINES,
  CLEAR_PASTE,
  DECRYPT_PASTE,
  ENCRYPT_THEN_SUBMIT_PASTE,
  GET_PASTE_FROM_URL,
  LOAD_THEME,
  POST_PASTE_TO_URL,
  READ_SETTINGS,
  REDIRECT_TO_SUBMITTED_PASTE,
  SET_DECRYPTED_PASTE,
  SET_HIGHLIGHTED_LINES,
  SET_SETTINGS,
  SET_THEME,
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

//
// SETTINGS
//

export const readSettings = () => ({
  type: READ_SETTINGS,
});

export const setSettings = (settings: ISettings) => ({
  settings,
  type: SET_SETTINGS,
});

export const setTheme = (theme: string) => ({
  theme,
  type: SET_THEME,
});

export const loadTheme = (theme: string) => ({
  theme,
  type: LOAD_THEME,
});

//
// HIGHLIGHTING
//

export const setHighlightedLines = (index: number, lines: number[]) => ({
  index,
  lines,
  type: SET_HIGHLIGHTED_LINES,
});

export const addHighlightedLines = (index: number, lhs: number, rhs: number) => ({
  index,
  lhs,
  rhs,
  type: ADD_HIGHLIGHTED_LINES,
});

export const addHighlightedLine = (index: number, line: number) => ({
  index,
  line,
  type: ADD_HIGHLIGHTED_LINE,
});

//
// SUBMIT PASTES
//
export const encryptThenSubmitPaste = (paste: string) => ({
  paste,
  type: ENCRYPT_THEN_SUBMIT_PASTE,
});

export const postPasteToUrl = (url: string, paste: Paste, data: string, key: string) => ({
  data,
  key,
  paste,
  type: POST_PASTE_TO_URL,
  url,
});

export const redirectToSubmittedPaste = (id: string, key: string, paste: string) => ({
  id,
  key,
  paste,
  type: REDIRECT_TO_SUBMITTED_PASTE,
});
