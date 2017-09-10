import * as React from "react";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Divider from "semantic-ui-react/dist/es/elements/Divider";
import Segment from "semantic-ui-react/dist/es/elements/Segment";
import Popup from "semantic-ui-react/dist/es/modules/Popup";


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

        {this.props.children && (<div><Divider /> {this.props.children}</div>)}
      </Segment>
    );
  }
}
