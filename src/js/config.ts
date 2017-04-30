import configuration from "../../config"
import { populateDefaults } from './util'

type ConfigT = {
  paste: string,
  get: string,
  shortURL: string
};

const defaults: ConfigT = {
  paste: "http://localhost:3000/paste",
  get: "http://localhost:3000/get/",
  shortURL: "http://127.0.0.1:3000/"
};

const config: ConfigT = populateDefaults(configuration, defaults);

export default config;
