import * as React from "react";
import { Button } from "semantic-ui-react";


export default class AddFileButton extends React.PureComponent<{}> {
  public render() {
    return (
      <Button secondary={true}>
        Upload File
      </Button>
    );
  }
}
