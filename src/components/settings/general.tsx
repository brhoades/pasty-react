import * as React from "react";
import { Form, Grid } from "semantic-ui-react";

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
