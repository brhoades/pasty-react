import { File } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { Reducer } from "../reducers/index";
import DisplayCodeFile from "./displaycodefile";
import DisplayImage from "./displayimage";


export interface IDisplayFileProps {
  index: number;
}

export interface IDisplayFileDispatchProps {
}

export interface IDisplayFileStateProps {
  file: File | null;
}

type PropsType = IDisplayFileStateProps & IDisplayFileDispatchProps & IDisplayFileProps;

class DisplayFile extends React.Component<PropsType, undefined> {
  constructor(props) {
    super(props);
  }

  public render() {
    // Keep a flag true for our initial file. If we unmount
    // we flip this value and stop rendering.
    if (this.props.file === null) {
      return null;
    }

    return (
      <div>
        <h3>{this.props.file.name}</h3>
        {/^image\//.test(this.props.file.meta.mime) && this.renderImage()}

        {this.props.file.isReadable() && this.renderCodeFile()}
      </div>
    );
  }

  private renderImage() {
    return (
      <DisplayImage
          data={this.props.file.data}
          mime={this.props.file.meta.mime}
      />
    );
  }

  private renderCodeFile() {
    return (
      <DisplayCodeFile
          index={this.props.index}
      />
    );
  }
}

const mapStateToProps = (state: Reducer, ownProps: DisplayFileProps): DisplayFileStateProps => {
  if (state.paste.paste != null) {
    return {
      file: state.paste.paste.files[ownProps.index]
    }
  }

  return {
    file: null
  }
};


const mapDispatchToProps = (dispatch: Dispatch<Reducer>): DisplayFileDispatchProps => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFile);
