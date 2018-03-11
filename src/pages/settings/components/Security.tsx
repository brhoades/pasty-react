import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Label from "semantic-ui-react/dist/es/elements/Label";

import KeySizeInput from "./KeySizeInput";


const SecuritySettings = (props: {}) => (
  <React.Fragment>
    <label>Key Size</label>
    <Field
      name="security.keysize"
      component={KeySizeInput}
    />
  </React.Fragment>
);

export default SecuritySettings;
