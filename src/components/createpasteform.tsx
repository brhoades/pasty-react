import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { WrappedFieldArrayProps, FieldArray, GenericFieldArray } from "redux-form";
import { Button, Form, Grid } from "semantic-ui-react";

import { IPartialPasteFile, PasteFileTypes } from "../reducers/form";
import { IReducer } from "../reducers/index";
import { STATE } from "../reducers/paste";

import PasteFileForms from "../components/pastefileforms";
import AddTextButton from "../components/buttons/addtextbutton";
import AddFileButton from "../components/buttons/addfilebutton";
import PasteButton from "../components/buttons/pastebutton";

export interface ICreatePasteFormDispatchProps {
}

export interface ICreatePasteFormProps {
  onSubmit: (ev: any) => void;
  valid: boolean;
  dirty: boolean;
}

export interface ICreatePasteFormStateProps {
  files: IPartialPasteFile[];
  submitting: boolean;
}

type PropsType = ICreatePasteFormProps & ICreatePasteFormStateProps & ICreatePasteFormDispatchProps;

class CreatePasteForm extends React.PureComponent<PropsType> {
  public render() {
    return (
      <div>
        <Form
          onSubmit={this.props.onSubmit}
          loading={this.props.submitting}
        >

          <div
            style={{
              marginBottom: '2em',
            }}
          >
            {
              this.props.files.length === 0 ?
              this.renderPlaceholder() :
              this.renderForm()
            }
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
        style={{
          textAlign: "center",
        }}
      >
        Drop files here or click a button to begin.
      </h2>
    );
  }
}

const mapStateToProps = (state: IReducer, ownProps: ICreatePasteFormProps): ICreatePasteFormStateProps => {
  return {
    files: state.form.createpaste.values.files,
    submitting: state.paste.state !== STATE.WAITING,
  };
};


const mapDispatchToProps = (dispatch: Dispatch<IReducer>): ICreatePasteFormDispatchProps => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePasteForm);
