import { encryptFile } from "pasty-core";
import { END, eventChannel } from "redux-saga";
import { SagaIterator } from "redux-saga";
import { call, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";

import Configuration from "../../config";
import {
  postPasteToUrl,
  redirectToSubmittedPaste,
  setGeneralError,
  setPasteProgress,
} from "../actions/creators";
import {
  ENCRYPT_THEN_SUBMIT_PASTE,
  POST_PASTE_TO_URL,
} from "../actions/types";
import { IReducer } from "../reducers/index";

const CryptoWorker = require("worker-loader!../scripts/crypto");


function encryptPasteAsync(paste, keysize) {
  return eventChannel((emitter) => {
    const worker = new CryptoWorker();
    // TODO: generalize generator statuses and formatting
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
        data: paste.json(),
        encrypt: true,
        keysize,
        name: paste.name,
      },
    });

    return () => {
      worker.terminate();
    };
  });
}

function createUploadPasteXHR(action) {
  return eventChannel((emitter) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", action.url, true);
    xhr.setRequestHeader("Content-type", "application/octet-stream");

    xhr.onload = (e) => {
      if ((e.target as any).status !== 200) {
        let message = "";
        try {
          // FIXME: What? Lambda stuff?
          const data = JSON.parse((e.target as any).responseText.replace("\\'", "'").replace('\\n', ''));
          message = data.error;
        } catch (e) {
          message = `HTTP${(e.target as any).status}: ${(e.target as any).statusText}`;
        }

        emitter({
          data: message,
          type: "error",
        });
      } else {
        emitter({
          data: e.target,
          type: "done",
        });
      }
      emitter(END);
    };

    xhr.upload.onprogress = (event) => {
      emitter({
        data: {
          progress: event.loaded,
          total: event.total,
        },
        type: "status",
      });
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
      const event = yield take(emitter);
      const { payload } = event;

      if (event.error) {
        throw Error(event.payload);
      }

      if (payload.progress) {
        yield put(setPasteProgress(payload.progress));
      } else {
        yield put(postPasteToUrl(
            Configuration.paste,
            action.paste,
            payload.data,
            payload.key,
        ));
      }
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

// Todo generalize and combine with download...
export function* uploadPaste(action) {
  const xhr = yield call(createUploadPasteXHR, action);

  try {
    while (true) {
      const event = yield take(xhr);

      if (event.type === "done") {
        // TODO: proper statuses
        const data = JSON.parse(event.data.response);

        if (data.error) {
          yield put(setGeneralError(
            `Error when uploading a new paste.`,
            data.error,
          ));

          return;
        }

        yield put(redirectToSubmittedPaste(data.filename, action.key, action.paste));
      } else if (event.type === "error") {
          yield put(setGeneralError(
            `Error when uploading a new paste.`,
            event.data,
          ));
      } else if (event.type === "status") {
        yield put(setPasteProgress(event.data.progress / event.data.total));
      }
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
