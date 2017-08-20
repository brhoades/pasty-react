import FileCard from "./filecard";
import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Field, FormSection } from "redux-form";
import { Form } from "semantic-ui-react";

import LanguageDropdownButton from "./buttons/languagedropdownbutton";
import AddTextFileActionsContainer from "../containers/addtextfileactionscontainer";
import { IPartialPasteFile } from "../reducers/form";
import { IReducer } from "../reducers/index";

export interface IAddTextFileFieldProps {
  index: number;
}

export interface IAddTextFileFieldStateProps {
  data: string;
  name: string;
}

type PropsType = IAddTextFileFieldProps & IAddTextFileFieldStateProps;

class AddTextFileField extends React.Component<PropsType, {highlight: string}> {
  constructor(props) {
    super(props);

    this.state = {
      highlight: props.highlight,
    };
  }

  public render() {
    const baseName = `files[${this.props.index}]`;
    return (
      <div>
        <FormSection name={baseName}>
          <FileCard
            header={
              <div>
                <div style={{float: "left"}}>
                <Field
                  name="name"
                  type="text"
                  component={(props: any) => (
                    <Form.Input
                      placeholder="hello_world.rb"
                      {...props.input}
                    />
                  )}
                  defaultValue={this.props.name}
                />
                </div>
              </div>
            }
            actionbar={<AddTextFileActionsContainer index={this.props.index} />}
          >
            <Field
              name="data"
              type="text"
              component={(props: any) => (
                <Form.TextArea
                  {...props.input}
                  onChange={(ev, data) => props.input.onChange(data.value)}
                  rows="20"
                  placeholder="puts 'Hello World!'"
                  label="File Contents"
                />
              )}
              defaultValue={this.props.data}
            />
          </FileCard>
        </FormSection>
      </div>
    );
  }
}

const mapStateToProps = (state: IReducer, ownProps: IAddTextFileFieldProps): IAddTextFileFieldStateProps => {
  const thisFile = state.form.createpaste.values.files[ownProps.index];

  return {
    data: thisFile.data,
    name: thisFile.name,
  };
};

export default connect(mapStateToProps, () => ({}))(AddTextFileField);
