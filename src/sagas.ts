import { eventChannel, END } from 'redux-saga'
import { call, take, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { decryptFile, PasteParser, Paste } from "pasty-core";
import { decryptPaste, setDecryptedPaste } from './actions/creators'
import {
  GET_PASTE_FROM_URL,
  DECRYPT_PASTE,
} from './actions/types';


function createXHRChannel(action) {
  return eventChannel(emitter => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', action.url, true);

    xhr.onload = (e) => {
      emitter((<any>e).target.response);
      emitter(END);
    };

    xhr.onprogress = (e) => {
      console.log("PROGRESS");
    };

    xhr.onerror = (e) => {
      console.log("ERROR");
    };

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
      let response = yield take(xhr);
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
