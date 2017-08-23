import { CodeFile, File, Paste, PasteFile } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Button, Form, Grid, Message } from "semantic-ui-react";

import { encryptThenSubmitPaste } from "../actions/creators";
import { IPartialPasteFile, IPasteFormData, PasteFileTypes } from "../reducers/form";
import { IReducer } from "../reducers/index";

import AddFileButton from "../components/buttons/addfilebutton";
import AddTextButton from "../components/buttons/addtextbutton";
import PasteButton from "../components/buttons/pastebutton";
import CreatePasteForm from "../components/createpasteform";

export interface ICreatePasteFormProps {
  submitting: boolean;
  handleSubmit: (cb) => (any);
  error: string;
  dirty: boolean;
  valid: boolean;
}

type InjectedCreatePasteProps = InjectedFormProps<IPasteFormData> & ICreatePasteFormProps;

const CreatePaste: React.StatelessComponent<InjectedCreatePasteProps> = (props: InjectedCreatePasteProps) => (
  <div>
    <Form
      onSubmit={props.handleSubmit(onSubmit)}
      loading={props.submitting}
    >
      {props.error && <Message error={true} content="An unknown error has occurred when submitting your paste." />}
      <div
        style={{
          marginBottom: '2em',
        }}
      >
        <CreatePasteForm />
      </div>
      <Grid>
        <Grid.Column width={8}>
          <Button.Group>
            <AddTextButton />
            <AddFileButton />
          </Button.Group>
        </Grid.Column>
        <Grid.Column width={8} textAlign="right">
          <PasteButton valid={props.valid && props.dirty} />
        </Grid.Column>
      </Grid>
    </Form>
  </div>
);

const onSubmit = (values: IPasteFormData, dispatch: Dispatch<IReducer>, props: InjectedCreatePasteProps) => {
  const paste: Paste = Paste.empty();
  paste.files = values.files.map((f, i) => {
    if (f.type === PasteFileTypes.FILE) {
      return new PasteFile(i, f.name, f.data, f.meta.mime);
    }
    return new CodeFile(i, f.name, f.data, f.meta.highlight, f.meta.mime);
  });

  dispatch(encryptThenSubmitPaste(paste.serialize()));
};

const validate = (values: IPasteFormData) => {
  let errors = {
    files: {},
  };

  if (values.files.length === 0) {
    errors.files["_error"] = "Must submit at least one file.";
    return errors;
  }

  errors = {
    files: values.files.map((f, i) => {
      if (!f.data || f.data.length === 0) {
        return "Files cannot be empty.";
      }

      return undefined;
    }),
  };

  console.dir(errors);
  return errors;
};

export default reduxForm<IPasteFormData, {}>({
  form: "createpaste",
  initialValues: {
    files: [],
  },
  onSubmit,
  validate,
})(CreatePaste);
