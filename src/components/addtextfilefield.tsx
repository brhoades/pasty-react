import FileCard from "./filecard";
import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Field, FormSection } from "redux-form";
import { Form } from "semantic-ui-react";

import AddTextFileActionsContainer from "../containers/addtextfileactionscontainer";
import { IPartialPasteFile } from "../reducers/form";
import { IReducer } from "../reducers/index";

export interface IAddTextFileFieldProps {
  index: number;
}

export interface IAddTextFileFieldStateProps {
  content: string;
  filename: string;
  languages: string[];
}

type PropsType = IAddTextFileFieldProps & IAddTextFileFieldStateProps;

class AddTextFileField extends React.Component<PropsType, {}> {
  public shouldComponentUpdate(nextProps) {
    return false;
  }

  public render() {
    const baseName = `files[${this.props.index}]`;
    return (
      <div>
        <Form>
          <FormSection name={baseName}>
            <FileCard
              header={
                <Field
                  name="filename"
                  type="text"
                  component={(props: any) => (
                      <Form.Input {...props.input} label="Filename" size="small" width="8"/>
                  )}
                  defaultValue={this.props.filename}
                />
              }
              actionbar={<AddTextFileActionsContainer index={this.props.index} />}
            >
              <Field
                name="content"
                type="text"
                component={(props: any) => <Form.TextArea {...props.input} rows="20" label="File Contents" />}
                defaultValue={this.props.content}
              />
            </FileCard>
          </FormSection>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: IReducer, ownProps: IAddTextFileFieldProps): IAddTextFileFieldStateProps => {
  const thisFile = state.form.createpaste.values.files[ownProps.index];

  return {
    content: thisFile.content,
    filename: thisFile.filename,
    languages: state.settings.languages,
  };
};



export default connect(mapStateToProps, () => ({}))(AddTextFileField);
