import * as React from "react";
import Header from "semantic-ui-react/dist/es/elements/Header";

import FontIconSettings from "./fonticon";


const AppearanceSettings = (props: {}) => (
  <div>
    <Header dividing={true}>
      Appearance
    </Header>
    <FontIconSettings />
  </div>
);

export default AppearanceSettings;
