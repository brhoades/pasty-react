import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { FieldArray, GenericFieldArray, WrappedFieldArrayProps } from "redux-form";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Grid from "semantic-ui-react/dist/es/collections/Grid";
import Button from "semantic-ui-react/dist/es/elements/Button";

import { IPartialPasteFile, PasteFileTypes } from "reducers/form";
import { IReducer } from "reducers/index";
import { STATE } from "reducers/paste";

import PasteLoading from "components/PasteLoading";
import PasteFileForms from "./PasteFileForms";
import AddFileButton from "./buttons/AddFileButton";
import AddTextButton from "./buttons/AddTextButton";
import PasteButton from "./buttons/PasteButton";


export interface ICreatePasteFormProps {
  onSubmit: (ev: any) => void;
  valid: boolean;
  dirty: boolean;
}

export interface ICreatePasteFormStateProps {
  files: IPartialPasteFile[];
  state: STATE;
}

type PropsType = ICreatePasteFormProps & ICreatePasteFormStateProps;

class CreatePasteForm extends React.PureComponent<PropsType> {
  public render() {
    const loadingComponent = this.props.state !== STATE.WAITING && this.props.state !== STATE.VIEWING && (
      <PasteLoading
        topBarLabel="Encrypt"
        bottomBarLabel="Upload"
        topBarKey={STATE.ENCRYPTING}
        bottomBarKey={STATE.UPLOADING}
      />
    );

    return (
      <div>
        {loadingComponent}
        <Form
          onSubmit={this.props.onSubmit}
        >

          <div
            style={{ marginBottom: "2em" }}
          >
            {this.props.files.length === 0 ? this.renderPlaceholder() : this.renderForm()}
          </div>
          <Grid>
            <Grid.Column width={8}>
              <Button.Group>
                <AddTextButton />
                <AddFileButton />
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <PasteButton valid={this.props.dirty} />
            </Grid.Column>
          </Grid>
        </Form>
      </div>
    );
  }

  private renderForm() {
    return (
      <FieldArray
        name="files"
        component={PasteFileForms}
        rerenderOnEveryChange={false}
      />
    );

  }

  private renderPlaceholder() {
    return (
      <h2
        style={{ textAlign: "center" }}
      >
        Drop files here or click a button to begin.
      </h2>
    );
  }
}

const mapStateToProps = (state: IReducer, ownProps: ICreatePasteFormProps): ICreatePasteFormStateProps => {
  return {
    files: state.form.createpaste.values.files,
    state: state.paste.state,
  };
};


const mapDispatchToProps = (dispatch: Dispatch<IReducer>): {} => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePasteForm);
