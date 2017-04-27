import configuration from "../../config"

const defaults = {
  paste: "http://localhost:3000/paste",
  get: "http://localhost:3000/get/"
};

// recursively populate missing config entries from default
function populateDefaults(config: any, def: any): any {
  let ret = {};

  Object.keys(def).map((key) => {
    if(typeof(def[key]) == 'object') {
      // TODO: if config doesn't have the obj, this'd be bad
      ret[key] = populateDefaults(config[key], def[key]);
    } else if(def[key] != undefined) {
      if(config[key] == undefined) {
        ret[key] = def[key];
      }
    } else {
      ret[key] = config[key];
    }
  });

  return config;
}

const config: any = populateDefaults(configuration, defaults);

export default config;
