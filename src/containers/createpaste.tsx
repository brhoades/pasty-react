import { File } from "pasty-core";
import * as React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Button, Form, Grid } from "semantic-ui-react";

import { IPasteFormData } from "../reducers/form";

import AddFileButton from "../components/buttons/addfilebutton";
import AddTextButton from "../components/buttons/addtextbutton";
import PasteButton from "../components/buttons/pastebutton";
import CreatePasteForm from "../components/createpasteform";

type CreatePasteProps = InjectedFormProps<IPasteFormData>;

export interface ICreatePasteState {
  loading: boolean;
}

class CreatePaste extends React.Component<CreatePasteProps, ICreatePasteState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit} loading={this.state.loading}>
          <div
            style={{
              marginBottom: '2em',
            }}
          >
            <CreatePasteForm
            />
          </div>
          <Grid>
            <Grid.Column width={8}>
              <Button.Group>
                <AddTextButton />
                <AddFileButton />
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <PasteButton />
            </Grid.Column>
          </Grid>
        </Form>
      </div>
    );
  }

  private onSubmit() {
    this.setState({
      loading: true,
    });
  }
}

export default reduxForm<IPasteFormData>({
  form: "createpaste",
  initialValues: {
    files: [],
  },
})(CreatePaste);
