import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Label from "semantic-ui-react/dist/es/elements/Label";

import KeySizeInput from "./keysizeinput";


const SecuritySettings = (props: {}) => (
  <div>
    <label>Key Size</label>
    <Field
      name="security.keysize"
      component={KeySizeInput as any} // redux-form typing issues
    />
  </div>
);

export default SecuritySettings;
