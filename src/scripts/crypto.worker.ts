import {
  encryptFile,
  BlobParserI,
  decryptFile,
  Paste,
  PasteParser,
} from 'pasty-core';

import { IDecryptPayload, IEncryptPayload, isEncrypt } from '../helpers/workertypes';

const ctx: Worker = self as any;

ctx.addEventListener("message", (e: { data: { payload: IDecryptPayload | IEncryptPayload } }) => {
  if (isEncrypt(e.data.payload)) {
    const data: IEncryptPayload = e.data.payload;
    // restore from serialized form
    const paste: Paste = PasteParser.parse(
      data.name, "", Buffer.from(data.data, 'binary')
    );

    ctx.postMessage({
      payload: encryptFile(paste, data.keysize),
    });
  } else {
    console.log('DECRYPT');
    const data: IDecryptPayload = e.data.payload;
    const dataBlob: BlobParserI = decryptFile(data.data, data.id, data.key);

    console.log('DONE');
    ctx.postMessage({
      payload: dataBlob.decrypt(),
    });
  }
});
