import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { arrayPush } from "redux-form";
import { Button } from "semantic-ui-react";

import { PasteFileTypes } from "../../reducers/form";
import { IReducer } from "../../reducers/index";


export interface IAddTextButtonDispatchProps {
  addCodeFile: () => void;
}

type PropsType = IAddTextButtonDispatchProps;

class AddTextButton extends React.Component<PropsType, {}> {
  public render() {
    return (
      <Button onClick={this.props.addCodeFile} secondary={true} type="button">
        Add Text
      </Button>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IAddTextButtonDispatchProps => ({
  addCodeFile: () => dispatch(arrayPush("createpaste", "files", {
    content: "",
    meta: {},
    type: PasteFileTypes.CODE,
  })),
});

export default connect(() => ({}), mapDispatchToProps)(AddTextButton);
