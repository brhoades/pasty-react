Pasty HTTP Client
====================
Pasty HTTP client is a React app for [pasty-server](https://github.com/brhoades/pasty-server)
that allows the anonymous uploading, downloading, and sharing of pastes (collections of files).
All pastes are encrypted client-side before transmission for storage. Submitted
pastes are solely tied to a server-provided identifier and are typically hosted from a public
S3 bucket. The corresponding AES key to each paste never leaves the client, rendering
server knowledge of the paste's existence useless. No identifying information about the
paste's origin is retained outside of your browser.

Installation
-----------
Clone this project and run:

```bash
yarn install
```

Usage
-----
Within the project directory:

```bash
cp config.example.ts config.ts
```

Edit config.ts to include details about your [pasty-server](https://github.com/brhoades/pasty-server)
instance. Afterwards, build the website:

```bash
yarn build
```

This will output the website in `dist/`. This can the be uploaded and be hosted as-is.

There is also a script to automatically upload to an S3 bucket, currently configured to a
public pasty instance. Create an `aws-credentials.json` file at the top-level of the project
following documentation [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-json-file.html)
and configure `aws-upload.conf.js`. Afterwards, you can run:

```bash
yarn upload
```

Changelog
-----------
See [Changelog](CHANGELOG.md)
