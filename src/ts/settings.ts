import { populateDefaults } from 'pasty-core'
import _ from 'lodash'

export type SecuritySettingsT = {
  keysize: number
};

export type SettingsT = {
  theme: string,
  security: SecuritySettingsT,
  languages: string[],
  server: string,
};

export const defaults: SettingsT = {
  theme: 'obsidian.css',
  security: {
    keysize: 32
  },
  languages: [
    "bash",
    "clojure",
    "cmake",
    "coffeescript",
    "cpp",
    "css",
    "diff",
    "d",
    "dockerfile",
    "elm",
    "erlang",
    "go",
    "haml",
    "haskell",
    "ini",
    "irc",
    "java",
    "javascript",
    "julia",
    "less",
    "lisp",
    "lua",
    "makefile",
    "markdown",
    "matlab",
    "nix",
    "objectivec",
    "ocaml",
    "perl",
    "php",
    "powershell",
    "prolog",
    "python",
    "r",
    "ruby",
    "rust",
    "scala",
    "scheme",
    "scss",
    "shell",
    "sql",
    "swift",
    "tex",
    "typescript",
    "vbnet",
    "vbscript",
    "vim",
    "x86asm",
    "xml",
    "yaml"
  ],
  server: "https://pasty.brod.es",
};

class SecuritySettings {
  private _settings: SecuritySettingsT;
  private _write: () => void;

  constructor(settings: SecuritySettingsT, writecb: () => void) {
    this._settings = settings;
    this._write = writecb;
  }

  public get keysize() {
    return this._settings.keysize;
  }

  public set keysize(value: number) {
    this._settings.keysize = value;
    this._write();
  }
};

export default class Settings {
  private _settings: SettingsT;
  private _security: SecuritySettings;
  private write: () => void;
  private _write: () => void;

  constructor($: any) {
    let cookie = $.pgwCookie({
      'name': 'settings',
      'json': true
    });

    this.write = () => {
      $.pgwCookie({
        'name': 'settings',
        'value': this._settings,
        'json': true
      });
    };

    // debounce calls to prevent sliders from setting the cookie hundreds of times
    this._write = _.debounce(() => {
      this.write();
    }, 250, { trailing: true });

    if (!cookie) {
      this._settings = (<any>Object).assign({}, defaults);
      this._write();
    } else {
      this._settings = populateDefaults(cookie, defaults);
    }

    this._security = new SecuritySettings(this._settings.security, this._write);
  }

  public get security(): SecuritySettings {
    return this._security;
  }

  public get theme(): string {
    return this._settings.theme;
  }

  public set theme(value: string) {
    this._settings.theme = value;
    this._write();
  }

  public get languages(): string[] {
    return Object.keys(this._settings.languages).map((i) => {
      return this._settings.languages[i];
    });
  }

  public enableLanguage(language: string): void {
    if (!(language in this.languages)) {
      this._settings.languages = [
        ...this.languages,
        language
      ];

      this.write();
    }
  }

  public disableLanguage(language: string): void {
    const index: number = this.languages.indexOf(language);
    if (index >= 0) {
      const languages: string[] = this.languages;

      languages.splice(index, 1);
      this._settings.languages = languages;
      this.write()
    }
  }
}
