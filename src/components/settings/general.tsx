import * as React from "react";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Grid from "semantic-ui-react/dist/es/collections/Grid";
import Header from "semantic-ui-react/dist/es/elements/Header";

import AppearanceSettings from "./appearance";
import LanguageSettings from "./language";
import ThemeSettings from "./theme";


const GeneralSettings = (props: {}) => (
  <Form>
    <AppearanceSettings />
    <br />
    <ThemeSettings />
    <br />
    <LanguageSettings />
  </Form>
);

export default GeneralSettings;
