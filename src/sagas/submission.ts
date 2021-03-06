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
    worker.addEventListener("message", data => {
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
  return eventChannel(emitter => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", action.url, true);
    xhr.setRequestHeader("Content-type", "application/octet-stream");

    xhr.onload = (event) => {
      if ((event.target as any).status !== 200) {
        let message = "";
        try {
          const data = JSON.parse((event.target as any).responseText.replace("\\'", "'").replace("\\n", ""));
          message = data.error;
        } catch (error) {
          if (event.target) {
            message = ("Error when parsing server response: "
                       + `${(event.target as any).statusText} (${(event.target as any).status})`);
          } else {
            message = `An unknown error has occurred (${error.message})`;
          }
        }

        emitter({
          data: message,
          type: "error",
        });
      } else {
        emitter({
          data: event.target,
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

    xhr.onerror = (e) => {
      if ((e as any).loaded === 0) {
        emitter({
          data: "No data transferred from server.",
          type: "error",
        });
      } else {
        emitter({
          data: "Unknown error",
          type: "error",
        });
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
  }
}

export function* uploadPaste(action) {
  const xhr = yield call(createUploadPasteXHR, action);

  try {
    while (true) {
      const event = yield take(xhr);

      if (event.type === "done") {
        // TODO: common communication method with download; proper statuses.
        const data = JSON.parse(event.data.response);

        if (data.error) {
          yield put(setGeneralError(
            `Error when uploading a new paste.`,
            data.error,
          ));

          return;
        }

        // update id/key on paste to avoid redownloading
        const paste = action.paste;
        paste.name = data.filename;
        paste.key = action.key;

        yield put(redirectToSubmittedPaste(data.filename, action.key, paste));
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
  }
}
