import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import Radio from "semantic-ui-react/dist/es/addons/Radio";
import Container from "semantic-ui-react/dist/es/elements/Container";
import Header from "semantic-ui-react/dist/es/elements/Header";

import IconOrText from "components/IconOrText";

export interface INonIdealStateProps {
  icon: string;
  iconText: string;
  header: JSX.Element | string;
  description: JSX.Element | string;
}

export default class NonIdealState extends React.PureComponent<INonIdealStateProps> {
  public render() {
    return (
      <Container textAlign="center">
        <IconOrText
          icon={this.props.icon}
          text=""
          size="huge"
        />
        <Header>{this.props.header}</Header>
        {this.props.description}
      </Container>
    );
  }
}
