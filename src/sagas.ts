import { decryptFile, Paste, PasteParser } from "pasty-core";
import { END, eventChannel } from "redux-saga";
import { SagaIterator } from "redux-saga";
import { all, call, put, take, takeEvery, takeLatest } from "redux-saga/effects";

import { decryptPaste, setDecryptedPaste, setGeneralError, setSettings } from "./actions/creators";
import {
  DECRYPT_PASTE,
  ENCRYPT_THEN_SUBMIT_PASTE,
  GET_PASTE_FROM_URL,
  LOAD_THEME,
  POST_PASTE_TO_URL,
  READ_SETTINGS,
} from "./actions/types";
import { encryptPaste, uploadPaste } from "./sagas/submission";

declare var $: any;


function createXHRChannel(action) {
  return eventChannel((emitter) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", action.url, true);

    xhr.onload = (e) => {
      emitter((e as any).target);
      emitter(END);
    };

    // xhr.onprogress = (e) => {

  // };

    xhr.send();

    return () => {
      xhr.abort();
    };
  });
}

function* decryptPasteSaga(action) {
  try {
    const dataBlob: string = decryptFile(action.data, action.key);
    const paste: Paste = PasteParser.parse(action.id, action.key, dataBlob);

    yield put(setDecryptedPaste(action.id, paste));
  } catch (e) {
    yield put(setGeneralError(
      `Error when decrypting the paste "${action.id}"`,
      e.message,
    ));
  }
}

function* download(action) {
  const xhr = yield call(createXHRChannel, action);

  try {
    while (true) {
      const response = yield take(xhr);
      const code = response.status;

      if (code >= 200 && code <= 400) {
        yield put(decryptPaste(action.id, action.key, response.response));
      } else {
        yield put(setGeneralError(
          `Error when downloading the paste "${action.id}"`,
          `${code} ${response.statusText}`,
        ));
      }
    }
  } finally {
    // nada
  }
}

function* readSettings(action) {
  let cookie = $.pgwCookie({
    json: true,
    name: 'settings',
  });

  if (cookie === undefined) {
    cookie = {};
  }

  yield put(setSettings(cookie));
}

function* loadTheme(action) {
  const themeName = `assets/hljs-themes/${action.theme}`;

  // TODO use a dynamic CSS loader to get themes.
  if ($("#hljs-theme").attr("href") !== themeName) {
    yield call(() => { $("#hljs-theme").attr("href", themeName); });
  }
}

function* saga(): SagaIterator {
  yield takeLatest(GET_PASTE_FROM_URL, download);
  yield takeLatest(DECRYPT_PASTE, decryptPasteSaga);
  yield takeLatest(READ_SETTINGS, readSettings);
  yield takeLatest(LOAD_THEME, loadTheme);
  yield takeLatest(ENCRYPT_THEN_SUBMIT_PASTE, encryptPaste);
  yield takeLatest(POST_PASTE_TO_URL, uploadPaste);
}

export default saga;
