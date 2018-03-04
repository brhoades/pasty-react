import {
  READ_SETTINGS,
  SET_AND_SAVE_SETTINGS,
  SET_SETTINGS,
} from "actions/types";


export interface ISecuritySettings {
  keysize: number;
}

export interface ISettings {
  defaultlanguage: string;
  fonticons: boolean;
  languages: string[];
  loaded: boolean;
  security: ISecuritySettings;
  theme: string;
}

const initial: ISettings = {
  defaultlanguage: "auto",
  fonticons: true,
  languages: [
    "bash", "clojure", "cmake", "coffeescript", "cpp", "css", "diff", "d", "dockerfile",
    "elm", "erlang", "go", "haml", "haskell", "ini", "irc", "java", "javascript", "julia",
    "less", "lisp", "lua", "makefile", "markdown", "matlab", "nix", "objectivec", "ocaml",
    "perl", "php", "powershell", "prolog", "python", "r", "ruby", "rust", "scala", "scheme",
    "scss", "shell", "sql", "swift", "tex", "typescript", "vbnet", "vbscript", "vim", "x86asm",
    "xml", "yaml",
  ],
  loaded: false,
  security: {
    keysize: 32,
  },
  theme: "obsidian.css",
};

const settings = (state: ISettings = initial, action) => {
  switch (action.type) {
    case SET_AND_SAVE_SETTINGS:
    case SET_SETTINGS:
      return {
        ...state,
        ...action.settings,
        loaded: true,
      };

    case READ_SETTINGS:
      return {
        ...state,
        loaded: false,
      };

    default:
      return state;
  }
};

export default settings;
