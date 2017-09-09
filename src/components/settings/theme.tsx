import * as React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Header, Grid } from "semantic-ui-react";


export interface IThemeSettings {
}

const ThemeSettings = (props: IThemeSettings) => (
  <div>
    <Header dividing={true}>
      Text Theme
    </Header>
  </div>
);

export default ThemeSettings;
