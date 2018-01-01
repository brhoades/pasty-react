import * as Cookies from "js-cookie";
import { BlobParserI, decryptFile, Paste, PasteParser } from "pasty-core";
import { END, eventChannel } from "redux-saga";
import { SagaIterator } from "redux-saga";
import { all, call, put, take, takeEvery, takeLatest } from "redux-saga/effects";

import {
  decryptPaste,
  setDecryptedPaste,
  setGeneralError,
  setPasteProgress,
  setSettings,
} from "./actions/creators";
import {
  DECRYPT_PASTE,
  ENCRYPT_THEN_SUBMIT_PASTE,
  GET_PASTE_FROM_URL,
  LOAD_THEME,
  POST_PASTE_TO_URL,
  READ_SETTINGS,
  SET_AND_SAVE_SETTINGS,
} from "./actions/types";
import { encryptPaste, uploadPaste } from "./sagas/submission";

const CryptoWorker = require("worker-loader!./scripts/crypto");


function createXHRChannel(action) {
  return eventChannel((emitter) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", action.url, true);

    xhr.onload = (e) => {
      emitter({
        response: e.target,
      });
      emitter(END);
    };

    xhr.onprogress = (e) => {
      emitter({
        progress: e.loaded / e.total,
      });
    };

    xhr.responseType = "arraybuffer";
    xhr.send();

    return () => {
      xhr.abort();
    };
  });
}

function decryptPasteAsync(action, id, key) {
  return eventChannel((emitter) => {
    const worker = new CryptoWorker();
    worker.addEventListener("message", (data) => {
      if (data.data.error) {
        emitter({
          error: true,
          payload: data.data.error,
        });
      } else {
        emitter({
          payload: data.data.payload,
        });
      }
    });

    worker.postMessage({
      payload: {
        data: action,
        encrypt: false,
        id,
        key,
      },
    });

    return () => {
      worker.terminate();
    };
  });
}

function* decryptPasteSaga(action) {
  try {
    const emitter = yield call(decryptPasteAsync, action.data, action.id, action.key);

    while (true) {
      const event = yield take(emitter);
      if (event.error) {
        throw Error(event.payload);
      }

      const { payload } = event;

      if (payload.progress) {
        yield put(setPasteProgress(payload.progress));
      } else {
        const paste: Paste = Paste.fromJSON(payload);

        yield put(setDecryptedPaste(action.id, paste));
      }
    }
  } catch (e) {
    console.log(e);
    yield put(setGeneralError(
      `Error when decrypting the paste "${action.id}"`,
      `The provided key may be incorrect ("${e.message}")`,
    ));
  }
}

function* download(action) {
  const xhr = yield call(createXHRChannel, action);

  try {
    while (true) {
      const event = yield take(xhr);
      if (event.progress) {
        yield put(setPasteProgress(event.progress));
      } else {
        const code = event.response.status;

        if (code >= 200 && code <= 400) {
          yield put(decryptPaste(action.id, action.key, event.response.response));
        } else {
          yield put(setGeneralError(
            `Error when downloading the paste "${action.id}"`,
            `${code} ${event.response.statusText}`,
          ));
        }
      }
    }
  } catch (e) {
    yield put(setGeneralError(
      `Error when downloading the paste "${action.id}"`,
      e.message,
    ));
  }
}

function* readSettings(action) {
  let cookie = Cookies.get("settings");

  if (cookie === undefined) {
    cookie = {};
  } else {
    cookie = JSON.parse(cookie);

    // Check for old format cookies or corrupted cookies.
    if (cookie === undefined || cookie.languages === undefined
        || cookie.security === undefined) {
      cookie = {};
    }
  }

  yield put(setSettings(cookie));
}

function* saveSettings(action) {
  Cookies.set("settings", JSON.stringify(action.settings));
}

function* loadTheme(action) {
  const themeName = `assets/hljs-themes/${action.theme}`;
  const theme = document.getElementById("hljs-theme");

  // TODO use a dynamic CSS loader to get themes.
  if (theme.attributes["href"] !== themeName) {
    yield call(() => { theme.setAttribute("href", themeName); });
  }
}

function* saga(): SagaIterator {
  yield takeLatest(GET_PASTE_FROM_URL, download);
  yield takeLatest(DECRYPT_PASTE, decryptPasteSaga);
  yield takeLatest(READ_SETTINGS, readSettings);
  yield takeLatest(LOAD_THEME, loadTheme);
  yield takeLatest(ENCRYPT_THEN_SUBMIT_PASTE, encryptPaste);
  yield takeLatest(POST_PASTE_TO_URL, uploadPaste);
  yield takeLatest(SET_AND_SAVE_SETTINGS, saveSettings);
}

export default saga;
