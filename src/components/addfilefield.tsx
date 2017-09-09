import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Field } from "redux-form";
import { Form, Message } from "semantic-ui-react";

import AddFileActionsContainer from "../containers/addfileactionscontainer";
import { IPartialPasteFileForm } from "../reducers/form";
import { IReducer } from "../reducers/index";
import LanguageDropdownButton from "./buttons/languagedropdownbutton";
import DisplayImage from "./displayimage";
import FileCard from "./filecard";

export interface IAddFileFieldProps {
  index: number;
  name: string;
  fields: IPartialPasteFileForm;
}

export interface IAddFileFieldStateProps {
}

type PropsType = IAddFileFieldProps & IAddFileFieldStateProps;

class AddFileField extends React.Component<PropsType> {
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
            <div style={{float: "left"}}>
              <Form.Input
                placeholder="dogpic.jpg"
                error={name.meta.error !== undefined}
                onChange={(ev, inputData) => name.input.onChange(inputData.value)}
                defaultValue={name.input.value}
              />
            </div>
          }
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
      </div>
    );
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
