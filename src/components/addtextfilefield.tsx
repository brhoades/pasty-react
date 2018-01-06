import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Field } from "redux-form";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Message from "semantic-ui-react/dist/es/collections/Message";

import AddTextFileActionsContainer from "../containers/addtextfileactionscontainer";
import { IPartialPasteFile, IPartialPasteFileForm } from "../reducers/form";
import { IReducer } from "../reducers/index";
import LanguageDropdownButton from "./buttons/languagedropdownbutton";
import FileCard from "./filecard";


export interface IAddTextFileFieldProps {
  index: number;
  name: string;
  fields: IPartialPasteFileForm;
}

type PropsType = IAddTextFileFieldProps;

class AddTextFileField extends React.Component<PropsType, {highlight: string}> {
  constructor(props) {
    super(props);

    this.state = {
      highlight: props.fields.meta.input.value.highlight,
    };

    this.textAreaOnChange = this.textAreaOnChange.bind(this);
    this.nameOnChange = this.nameOnChange.bind(this);
  }

  public shouldComponentUpdate(newProps: PropsType) {
    const fields = this.props.fields;

    return true;
  }

  public render() {
    const {name, data} = this.props.fields;
    const header = (
      <div>
        <div style={{float: "left"}}>
          <Form.Input
            placeholder="hello_world.rb"
            error={name.meta.error !== undefined}
            onChange={this.nameOnChange}
            defaultValue={name.input.value}
          />
        </div>
      </div>
    );

    return (
      <div>
        <FileCard
          header={header}
          attached={data.meta.submitFailed && data.meta.error}
          actionbar={<AddTextFileActionsContainer index={this.props.index} />}
        >
          <div>
            <Form.TextArea
              error={data.meta.submitFailed && data.meta.error !== undefined}
              rows="20"
              placeholder="puts 'Hello World!'"
              label="File Contents"
              onChange={this.textAreaOnChange}
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

  private textAreaOnChange(event, inputData) {
    return this.props.fields.data.input.onChange(inputData.value);
  }

  private nameOnChange(event, inputData) {
    return this.props.fields.name.input.onChange(inputData.value);
  }
}

export default AddTextFileField;
