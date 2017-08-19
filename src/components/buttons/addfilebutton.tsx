import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { arrayPush } from "redux-form";
import { Button } from "semantic-ui-react";

import { IReducer } from "../../reducers/index";


export interface IAddFileButtonDispatchProps {
  addCodeFile: () => void;
}

type PropsType = IAddFileButtonDispatchProps;

class AddFileButton extends React.Component<PropsType, {}> {
  public render() {
    return (
      <Button onClick={this.props.addCodeFile} secondary={true}>
        Upload File
      </Button>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IAddFileButtonDispatchProps => ({
  addCodeFile: () => dispatch(arrayPush("createpaste", "files", {
    content: "",
    meta: {},
    type: "auto",
  })),
});

export default connect(() => ({}), mapDispatchToProps)(AddFileButton);
