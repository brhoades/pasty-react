import FileCard from "./filecard";
import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Field, FormSection } from "redux-form";
import { Form, Message } from "semantic-ui-react";

import LanguageDropdownButton from "./buttons/languagedropdownbutton";
import AddTextFileActionsContainer from "../containers/addtextfileactionscontainer";
import { IPartialPasteFile, IPartialPasteFileForm } from "../reducers/form";
import { IReducer } from "../reducers/index";

export interface IAddTextFileFieldProps {
  index: number;
  name: string;
  fields: IPartialPasteFileForm;
}

export interface IAddTextFileFieldStateProps {
}

type PropsType = IAddTextFileFieldProps & IAddTextFileFieldStateProps;

class AddTextFileField extends React.Component<PropsType, {highlight: string}> {
  constructor(props) {
    super(props);

    this.state = {
      highlight: props.fields.meta.input.value.highlight,
    };
  }

  public shouldComponentUpdate(newProps: PropsType) {
    const fields = this.props.fields;

    return true;
  }

  public render() {
    const {name, data} = this.props.fields;

    return (
      <div>
        <FileCard
          header={
            <div>
              <div style={{float: "left"}}>
                <Form.Input
                  placeholder="hello_world.rb"
                  error={name.meta.error !== undefined}
                  onChange={(ev, inputData) => name.input.onChange(inputData.value)}
                  defaultValue={name.input.value}
                />
              </div>
            </div>
          }
          attached={data.meta.submitFailed && data.meta.error}
          actionbar={<AddTextFileActionsContainer index={this.props.index} />}
        >
          <div>
            <Form.TextArea
              error={data.meta.submitFailed && data.meta.error !== undefined}
              rows="20"
              placeholder="puts 'Hello World!'"
              label="File Contents"
              onChange={(ev, inputData) => data.input.onChange(inputData.value)}
              defaultValue={data.input.value}
            />
          </div>
        </FileCard>
        <Message
          error={true}
          attached="bottom"
          visible={data.meta.submitFailed && data.meta.error}
          header="Error when processing this file"
          content={data.meta.error}
        />
      </div>
    );
  }
}

export default AddTextFileField;
