import { decryptFile, Paste, PasteParser } from "pasty-core";
import { END, eventChannel } from "redux-saga";
import { SagaIterator } from "redux-saga";
import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects";

import { decryptPaste, setDecryptedPaste, setSettings } from "./actions/creators";
import {
  DECRYPT_PASTE,
  GET_PASTE_FROM_URL,
  LOAD_THEME,
  READ_SETTINGS,
} from "./actions/types";

declare var $: any;


function createXHRChannel(action) {
  return eventChannel((emitter) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", action.url, true);

    xhr.onload = (e) => {
      emitter((e as any).target.response);
      emitter(END);
    };

    // xhr.onprogress = (e) => {
    // };

    // xhr.onerror = (e) => {
    // };

    xhr.send();

    return () => {
      xhr.abort();
    };
  });
}

function* decryptPasteSaga(action) {
  const dataBlob: string = decryptFile(action.data, action.key);
  const paste: Paste = PasteParser.parse(action.id, action.key, dataBlob);

  yield put(setDecryptedPaste(action.id, paste));
}

function* download(action) {
  const xhr = yield call(createXHRChannel, action);

  try {
    while (true) {
      const response = yield take(xhr);
      yield put(decryptPaste(action.id, action.key, response));
    }
  } finally {
    // nada
  }
}

function* readSettings(action) {
  let cookie = $.pgwCookie({
    name: 'settings',
    json: true,
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
}

export default saga;
