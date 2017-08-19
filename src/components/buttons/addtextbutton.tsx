import * as React from "react";
import { Button } from "semantic-ui-react";


export default class AddTextButton extends React.PureComponent<{}> {
  public render() {
    return (
      <Button secondary={true}>
        Add Text
      </Button>
    );
  }
}
