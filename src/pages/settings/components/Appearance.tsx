import * as React from "react";
import Header from "semantic-ui-react/dist/es/elements/Header";

import FontIconSettings from "./FontIcon";


const AppearanceSettings = (props: {}) => (
  <React.Fragment>
    <Header dividing={true}>
      Appearance
    </Header>
    <FontIconSettings />
  </React.Fragment>
);

export default AppearanceSettings;
