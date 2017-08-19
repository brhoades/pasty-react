import * as React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { Button, Grid } from "semantic-ui-react";

import { IFormData } from "../reducers/form";

import AddFileButton from "../components/buttons/addfilebutton";
import AddTextButton from "../components/buttons/addtextbutton";
import PasteButton from "../components/buttons/pastebutton";
import CreatePasteForm from "../components/createpasteform";

type CreatePasteProps = InjectedFormProps<IFormData>;

class CreatePaste extends React.Component<CreatePasteProps, undefined> {
  public render() {
    return (
      <div>
        <CreatePasteForm />
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
      </div>
    );
  }
}

export default reduxForm<IFormData>({
  form: "createpaste",
})(CreatePaste);
