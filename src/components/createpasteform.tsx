import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { WrappedFieldArrayProps, FieldArray, GenericFieldArray } from "redux-form";
import { Form } from "semantic-ui-react";

import { IPartialPasteFile, PasteFileTypes } from "../reducers/form";
import { IReducer } from "../reducers/index";

import AddTextFileField from "./addtextfilefield";

export interface ICreatePasteFormDispatchProps {
}

export interface ICreatePasteFormStateProps {
  files: IPartialPasteFile[];
}

type PropsType = ICreatePasteFormStateProps;

class CreatePasteForm extends React.Component<PropsType, undefined> {

  public render() {
    return (
      <div>
        {
          this.props.files.length === 0 ?
          this.renderPlaceholder() :
          this.renderForm()
        }
      </div>
    );
  }

  private renderForm() {
    return this.props.files.map((file: IPartialPasteFile, index: number) => {
      if (file.type === PasteFileTypes.CODE) {
        return (<AddTextFileField key={index} index={index} />);
      }

      return (<input key={index} type="text" />);
    });
  }

  private renderPlaceholder() {
    return (
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Drop files here or click a button to begin.
      </h2>
    );
  }
}

const mapStateToProps = (state: IReducer, ownProps: {}): ICreatePasteFormStateProps => {
  return {
    files: state.form.createpaste.values.files,
  };
};


const mapDispatchToProps = (dispatch: Dispatch<IReducer>): ICreatePasteFormDispatchProps => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePasteForm);
