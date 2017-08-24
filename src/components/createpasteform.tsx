import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { WrappedFieldArrayProps, FieldArray, GenericFieldArray } from "redux-form";
import { Button, Form, Grid, Message } from "semantic-ui-react";

import { IPartialPasteFile, PasteFileTypes } from "../reducers/form";
import { IReducer } from "../reducers/index";
import { STATE } from "../reducers/paste";

import AddFileButton from "../components/buttons/addfilebutton";
import AddTextFileField from "./addtextfilefield";
import AddTextButton from "../components/buttons/addtextbutton";
import PasteButton from "../components/buttons/pastebutton";

export interface ICreatePasteFormDispatchProps {
}

export interface ICreatePasteFormProps {
  onSubmit: (ev: any) => void;
  valid: boolean;
  error: string;
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
          onSubmit={this.props.onSubmit.bind(this)}
          loading={this.props.submitting}
        >
          {
            this.props.error &&
            <Message error={true} content="An unknown error has occurred when submitting your paste." />
          }

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
              <PasteButton valid={this.props.valid && this.props.dirty} />
            </Grid.Column>
          </Grid>
        </Form>
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

const mapStateToProps = (state: IReducer, ownProps: ICreatePasteFormProps): ICreatePasteFormStateProps => {
  return {
    files: state.form.createpaste.values.files,
    submitting: state.paste.state !== STATE.WAITING,
  };
};


const mapDispatchToProps = (dispatch: Dispatch<IReducer>): ICreatePasteFormDispatchProps => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePasteForm);
