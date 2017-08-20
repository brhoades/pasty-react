import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { arrayPush } from "redux-form";
import { Button } from "semantic-ui-react";

import { PasteFileTypes } from "../../reducers/form";
import { IReducer } from "../../reducers/index";


export interface IAddFileButtonDispatchProps {
  addFile: () => void;
}

type PropsType = IAddFileButtonDispatchProps;

class AddFileButton extends React.Component<PropsType, {}> {
  private input: HTMLElement;

  constructor(props) {
    super(props);

    this.uploadFile = this.uploadFile.bind(this);
  }

  public render() {
    return (
      <div>
        <input type="file" hidden={true} ref={(input) => this.input = input}/>
        <Button onClick={this.uploadFile} secondary={true} type="button">
          Upload File
        </Button>
      </div>
    );
  }

  private uploadFile() {
    this.input.click();
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IAddFileButtonDispatchProps => ({
  addFile: () => dispatch(arrayPush("createpaste", "files", {
    data: "",
    meta: {},
    type: PasteFileTypes.FILE,
  })),
});

export default connect(() => ({}), mapDispatchToProps)(AddFileButton);
