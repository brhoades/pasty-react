import * as React from "react";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Grid from "semantic-ui-react/dist/es/collections/Grid";

import LanguageSettings from "./language";
import ThemeSettings from "./theme";


export interface IGeneralSettings {
}

const GeneralSettings = (props: IGeneralSettings) => (
  <Form>
    <ThemeSettings />
    <br />
    <LanguageSettings />
  </Form>
);

export default GeneralSettings;
