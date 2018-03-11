import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Field } from "redux-form";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Message from "semantic-ui-react/dist/es/collections/Message";

import DisplayImage from "components/DisplayImage";
import FileCard from "components/FileCard";
import { IPartialPasteFileForm } from "reducers/form";
import { IReducer } from "reducers/index";
import AddFileActionsContainer from "./AddFileActionsContainer";
import LanguageDropdownButton from "./buttons/LanguageDropdownButton";


export interface IAddFileFieldProps {
  index: number;
  name: string;
  fields: IPartialPasteFileForm;
}

type PropsType = IAddFileFieldProps & {};

class AddFileField extends React.Component<PropsType> {
  constructor(props) {
    super(props);

    this.nameOnChange = this.nameOnChange.bind(this);
  }

  public shouldComponentUpdate(newProps: PropsType) {
    const fields = this.props.fields;

    return true;
  }

  public render() {
    const {name, data} = this.props.fields;

    const header = (
      <div style={{float: "left"}}>
        <Form.Input
          placeholder="dogpic.jpg"
          error={name.meta.error !== undefined}
          onChange={this.nameOnChange}
          defaultValue={name.input.value}
        />
      </div>
    );

    return (
      <React.Fragment>
        <FileCard
          header={header}
          attached={data.meta.submitFailed && data.meta.error}
          actionbar={<AddFileActionsContainer index={this.props.index} />}
        >
          {/^image\//.test(this.props.fields.meta.input.value.mime) && this.renderImage()}
        </FileCard>
        <Message
          error={true}
          attached="bottom"
          visible={data.meta.submitFailed && data.meta.error}
          header="Error when processing this file"
          content={data.meta.error}
        />
      </React.Fragment>
    );
  }

  private nameOnChange(event, inputData) {
    return this.props.fields.name.input.onChange(inputData.value);
  }

  private renderImage() {
    return (
      <DisplayImage
        data={this.props.fields.data.input.value}
        mime={this.props.fields.meta.input.value.mime}
      />
    );
  }
}

export default AddFileField;
