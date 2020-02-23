import { CodeFile, File, Paste, PasteFile } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import Message from "semantic-ui-react/dist/es/collections/Message";

import { encryptThenSubmitPaste } from "actions/creators";
import { IPartialPasteFile, IPasteFormData, PasteFileTypes } from "reducers/form";
import { IReducer } from "reducers/index";
import CreatePasteForm from "./components/CreatePasteForm";

import GenericNonIdealState from "components/GenericNonIdealState";

export interface ICreatePasteState {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface ICreatePasteProps {
  initialValues?: Partial<IPasteFormData>;
}

export type PropsType = InjectedFormProps<IPasteFormData & ICreatePasteProps>;

export class CreatePaste extends React.Component<PropsType, ICreatePasteState> {
  public static defaultProps: Partial<ICreatePasteProps> = {
    initialValues: {
      files: [],
    },
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.error) {
      return (
        <GenericNonIdealState
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          action="creating a paste"
        />
      );
    }

    return (
      <React.Fragment>
        {this.props.error && this.errorMessage()}
        <CreatePasteForm
          valid={this.props.valid}
          dirty={this.props.dirty}
          onSubmit={this.props.handleSubmit}
        />
      </React.Fragment>
    );
  }

  private errorMessage() {
    return <Message error={true} content="An unknown error has occurred when submitting your paste." />;
  }
}

// TODO clean this mess up. I think I need a few more components to separate this from
// the store cleanly.
export const onSubmit = (values: IPasteFormData, dispatch: Dispatch<IReducer>, props: PropsType) => {
  const paste: Paste = Paste.empty();
  paste.files = values.files.map((f, i) => {
    if (f.type === PasteFileTypes.FILE) {
      return new PasteFile(i, f.name, f.data, f.meta.mime);
    }
    return new CodeFile(i, f.name, f.data, f.meta.highlight, f.meta.mime);
  });

  dispatch(encryptThenSubmitPaste(paste));
};

export const validate = (values: IPasteFormData, props: any) => {
  let errors: { files?: any } = {};

  if (values.files.length === 0) {
    errors.files = "Must submit at least one file.";
  }

  values.files.forEach((f, i) => {
    if (!f.data || f.data.length === 0) {
      errors.files[i] = {
        data: "Empty files are not allowed.",
      };
    }
  });

  return errors;
};

export const customInitialCreatePaste = (initialValues: Partial<IPasteFormData>) => (
  reduxForm<IPasteFormData>({
    form: "createpaste",
    initialValues,
    onSubmit,
    validate,
  })(CreatePaste)
);

export default customInitialCreatePaste({
  files: [],
});
