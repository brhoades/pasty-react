import * as React from "react";
import { Form, Grid } from "semantic-ui-react";

import ThemeSettings from "./theme";
import LanguageSettings from "./language";


export interface IGeneralSettings {
}

const GeneralSettings = (props: IGeneralSettings) => (
  <Form>
    <ThemeSettings />
    <LanguageSettings />
  </Form>
);

export default GeneralSettings;
