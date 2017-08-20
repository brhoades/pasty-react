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
              <h3>{this.props.header}</h3>
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
      </div>
    );
  }
}
