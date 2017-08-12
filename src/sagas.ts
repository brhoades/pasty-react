import { decryptFile, Paste, PasteParser } from "pasty-core";
import { END, eventChannel } from "redux-saga";
import { SagaIterator } from "redux-saga";
import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects";

import { decryptPaste, setDecryptedPaste } from "./actions/creators";
import {
  DECRYPT_PASTE,
  GET_PASTE_FROM_URL,
} from "./actions/types";


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

function* saga(): SagaIterator {
  yield takeEvery(GET_PASTE_FROM_URL, download);
  yield takeEvery(DECRYPT_PASTE, decryptPasteSaga);
}

export default saga;
