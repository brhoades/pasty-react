import * as React from "react";
import Header from "semantic-ui-react/dist/es/elements/Header";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Grid from "semantic-ui-react/dist/es/collections/Grid";

import AppearanceSettings from "./appearance";
import LanguageSettings from "./language";
import ThemeSettings from "./theme";


export interface IGeneralSettings {
}

const GeneralSettings = (props: IGeneralSettings) => (
  <Form>
    <AppearanceSettings />
    <br />
    <ThemeSettings />
    <br />
    <LanguageSettings />
  </Form>
);

export default GeneralSettings;
