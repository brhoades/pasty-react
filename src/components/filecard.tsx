import * as React from "react";
import { Divider, Form, Header, Popup, Segment } from "semantic-ui-react";

export interface IFileCardProps {
  actionbar?: React.ReactElement<any>;
  header: React.ReactElement<any> | string;
}

type PropsType = IFileCardProps;

export default class FileCard extends React.Component<PropsType, {}> {
  public render() {
    return (
      <div
        style={{
          paddingBottom: "1em",
          paddingTop: "1em",
        }}
      >
        <Segment>
          <Header>
            {this.props.header}
            {this.props.actionbar}
          </Header>

          <Divider />

          {this.props.children}
        </Segment>
      </div>
    );
  }
}
