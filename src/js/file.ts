export default class File {
  data: string;
  mime: string;
  key: string;
  server_filename: string;
  real_filename: string;


  // data: base64 string for data
  // mime: mime filetype
  // filename: server file name for downloading
  // key: uridecoded string.
  constructor(data: string, mime: string, sfilename: string, rfilename: string, key: string) {
    this.data = data;
    this.mime = mime;
    this.key = key;
    this.server_filename = sfilename;
    this.real_filename = rfilename;
  }

  // URL to view the file directly.
  getURL(): string {
    // TODO: use a config item here, downloaded from the server.
    // TODO: global config file after downloaded... stored somewhere.
    //       perhaps baked into build.js?
    let baseLocation: string = location.href.replace(location.hash, "")
    return `${baseLocation}#/view/${this.server_filename}/${encodeURIComponent(this.key)}`;
  }

  // URL to "download" the file.
  getRawURL(): string {
    return `${this.getURL()}/raw`
  }

  // base64 string for feeding into a browser URL.
  base64String(): string {
    return `data:${this.mime};base64,${this.data}`;
  }

  // base64 string for forcing a file download.
  base64DownloadString(): string {
    return `data:application/octet-stream;base64,${this.data}`;
  }
}
