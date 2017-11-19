import { Buffer } from "buffer";
import { Paste } from "pasty-core";


interface IWorkerPostMessage {
  payload: string;
}

interface IEncryptPayload {
  data: string;
  keysize: number;
  name: string;

  encrypt: true;
}

interface IDecryptPayload {
  data: string;
  id: string;
  key: string;

  encrypt: false;
}

const isEncrypt = (payload: IEncryptPayload | IDecryptPayload): payload is IEncryptPayload => (
  payload.encrypt
);

export {
  IDecryptPayload,
  IEncryptPayload,
  IWorkerPostMessage,
  isEncrypt,
};
