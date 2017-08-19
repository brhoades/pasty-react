import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { FieldArray } from "redux-form";

import { IPartialPasteFile } from "../reducers/form";
import { IReducer } from "../reducers/index";


export interface ICreatePasteFormDispatchProps {
}

export interface ICreatePasteFormStateProps {
  files: IPartialPasteFile[];
}

type PropsType = ICreatePasteFormStateProps;

class CreatePasteForm extends React.Component<PropsType, {}> {
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
    return (
      <FieldArray
        name="files"
        component={(props): React.ReactElement<any> => (<input {...props } /> )}
      />
    );
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
