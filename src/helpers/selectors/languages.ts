import { createSelector } from "reselect";


const getSettingsLanguages = (state) => state.settings.languages;

export const getLanguages = createSelector(
  getSettingsLanguages, languages => [
      {
        key: "auto",
        text: "Auto Detect",
        value: "auto",
      },
      {
        key: "plain",
        text: "Plain",
        value: "plain",
      },
      ...languages.map((lang) => ({
        key: lang,
        text: lang,
        value: lang,
      })),
  ],
);
