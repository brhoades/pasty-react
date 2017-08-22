import * as React from "react";
import { Form } from "semantic-ui-react";


const PasteButton = (props: {valid: boolean}) => (
  <Form.Button type="submit" primary={true} disabled={!props.valid}>
    Paste
  </Form.Button>
);

export default PasteButton;
