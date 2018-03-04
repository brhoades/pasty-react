import { CodeFile } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { arrayPush } from "redux-form";
import Button from "semantic-ui-react/dist/es/elements/Button";

import { PasteFileTypes } from "reducers/form";
import { IReducer } from "reducers/index";


export interface IAddTextButtonDispatchProps {
  addCodeFile: () => void;
}

type PropsType = IAddTextButtonDispatchProps;

const AddTextButton = (props: PropsType) => (
  <Button onClick={props.addCodeFile} secondary={true} type="button">
    Add Text
  </Button>
);

const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IAddTextButtonDispatchProps => ({
  addCodeFile: () => dispatch(arrayPush(
    "createpaste", "files", {
      ...CodeFile.empty().rawObject(),
      type: PasteFileTypes.CODE,
    },
  )),
});

export default connect(() => ({}), mapDispatchToProps)(AddTextButton);
