import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import { Form, Label } from "semantic-ui-react";

import KeySizeInput from "./keysizeinput";


export interface ISecuritySettings {
}

const SecuritySettings = (props: ISecuritySettings) => (
  <div>
    <label>Key Size</label>
    <Field
      name="keysize"
      component={KeySizeInput}
    />
  </div>
);

export default SecuritySettings;
