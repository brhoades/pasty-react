import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import { Form, Label } from "semantic-ui-react";


export interface IKeySizeInputProps {
}

const KeySizeInput = (props: WrappedFieldProps & IKeySizeInputProps) => (
  <div>
    <Form.Input
      value={props.input.value}
      type="number"
      onChange={(ev, data) => props.input.onChange(data.value)}
      error={props.meta.invalid}
    />
    {
      props.meta.invalid ?
        <Label basic={true} color="red" pointing="above">{props.meta.error}</Label>
      :
        <div>
          Larger is better; used for <a href="https://en.wikipedia.org/wiki/PBKDF2">PBKDF2</a>.
        </div>
    }
  </div>
);

export default KeySizeInput;
