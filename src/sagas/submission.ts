import { encryptFile } from "pasty-core";
import { END, eventChannel } from "redux-saga";
import { SagaIterator } from "redux-saga";
import { call, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";

import Configuration from "../../config";
import {
  postPasteToUrl,
  redirectToSubmittedPaste,
  setGeneralError,
} from "../actions/creators";
import {
  ENCRYPT_THEN_SUBMIT_PASTE,
  POST_PASTE_TO_URL,
} from "../actions/types";
import { IReducer } from "../reducers/index";


function encryptPasteAsync(paste, keysize) {
  return eventChannel((emitter) => {

    // todo web worker

    // todo keysize
    setTimeout(() => {
      emitter(encryptFile(paste, keysize));
      emitter(END);
    }, 0);

    return () => {
      // no way to abort
    };
  });
}

function createUploadPasteXHR(action) {
  return eventChannel((emitter) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", action.url, true);
    xhr.setRequestHeader("Content-type", "application/octet-stream");

    xhr.onload = (e) => {
      if ((e as any).target.status !== 200) {
        console.dir(e);
        console.error("ERROR UPLOADING");
        emitter(END);
      } else {
        emitter(e.target);
        emitter(END);
      }
    };

    // send an arraybuffer / blob
    xhr.send(action.data);

    return () => {
      xhr.abort();
    };
  });
}

export function* encryptPaste(action) {
  const keysize = yield select((state: IReducer) => state.settings.security.keysize);
  const emitter = yield call(encryptPasteAsync, action.paste, keysize);

  try {
    while (true) {
      const payload = yield take(emitter);

      yield put(postPasteToUrl(
        Configuration.paste,
        action.paste,
        payload.data,
        payload.key,
      ));
    }
  } catch (e) {
    yield put(setGeneralError(
      `Error when encrypting a paste for submission.`,
      e.message,
    ));
  } finally {
    // nada
  }
}

export function* uploadPaste(action) {
  const xhr = yield call(createUploadPasteXHR, action);

  try {
    while (true) {
      const response = yield take(xhr);
      const data = JSON.parse(response.response);

      if (data.error) {
        yield put(setGeneralError(
          `Error when uploading a new paste.`,
          data.error,
        ));

        return;
      }

      yield put(redirectToSubmittedPaste(data.filename, action.key, action.paste));
    }
  } catch (e) {
    yield put(setGeneralError(
      `Error when uploading a new paste.`,
      e.message,
    ));
  } finally {
    // nada
  }
}
