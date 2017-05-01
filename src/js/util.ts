// https://jsfiddle.net/Guffa/DDn6W/
export function randomPassword(length): string {
  let chars: string = "abcdefghijklmnopqrstuvwxyz-_.ABCDEFGHIJKLMNOP1234567890";
  let pass: string = "";

  for (var x = 0; x < length; x++) {
    let i: number = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }

  return pass;
}

// recursively populate missing config entries from default
export function populateDefaults(config: any, def: any): any {
  let ret = {};

  Object.keys(def).map((key) => {
    if(typeof(def[key]) == 'object') {
      // TODO: if config doesn't have the obj, this'd be bad
      ret[key] = populateDefaults(config[key], def[key]);
    } else if(def[key] != undefined) {
      if(config[key] == undefined) {
        ret[key] = def[key];
      } else {
        ret[key] = config[key];
      }
    } else {
      ret[key] = config[key];
    }
  });

  return ret;
}
