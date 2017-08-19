import * as React from "react";
import { Form } from "semantic-ui-react";


interface IPasteButtonState {
}

export default class PasteButton extends React.Component<{}, IPasteButtonState> {
  public render() {
    return (
      <Form.Button type="submit" primary={true}>
        Paste
      </Form.Button>
    );
  }
}
