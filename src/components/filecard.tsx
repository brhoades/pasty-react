import * as React from "react";
import { Divider, Form, Header, Popup, Segment } from "semantic-ui-react";

export interface IFileCardProps {
  actionbar?: React.ReactElement<any>;
  attached?: boolean;
  header: React.ReactElement<any> | string;
}

type PropsType = IFileCardProps;

export default class FileCard extends React.Component<PropsType, {}> {
  public render() {
    return (
      <Segment
        attached={this.props.attached}
        style={{
          paddingBottom: "1em",
          paddingTop: "1em",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              flexGrow: 1,
            }}
          >
            {this.props.header}
          </div>
          <div
            style={{
              display: "inline-flex",
              flexGrow: 0,
            }}
          >
            {this.props.actionbar}
          </div>
        </div>

        <Divider />

        {this.props.children}
      </Segment>
    );
  }
}
