import * as React from "react";
import { Button } from "semantic-ui-react";


interface IPasteButtonState {
  loading: boolean;
}

export default class PasteButton extends React.Component<{}, IPasteButtonState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  public render() {
    return (
      <Button loading={this.state.loading} onClick={() => this.setState({loading: true})} primary={true}>
        Paste
      </Button>
    );
  }
}
