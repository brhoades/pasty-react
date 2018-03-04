import { File, Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import DisplayImage from "components/DisplayImage";
import FileCard from "components/FileCard";
import Maybe from "helpers/maybe";
import { IReducer } from "reducers/index";
import DisplayCodeFile from "./DisplayCodeFile";
import FileActionsContainer from "./FileActionsContainer";

const style = require("css/displayfile.css");


export interface IDisplayFileProps {
  index: number;
}

export interface IDisplayFileStateProps {
  file: Maybe<File>;
}

type PropsType = IDisplayFileStateProps & IDisplayFileProps;

class DisplayFile extends React.Component<PropsType, undefined> {
  public render() {
    if (this.props.file.isNothing()) {
      return null;
    }

    return (
      <div style={{ marginBottom: "2em" }}>
        <FileCard
          header={<h2>{this.props.file.getData().getName()}</h2>}
          actionbar={<FileActionsContainer index={this.props.index} />}
        >
          {this.showFile()}
        </FileCard>
      </div>
    );
  }

  private showFile() {
    const file: File = this.props.file.getData();

    if (file.isReadable()) {
      return this.renderCodeFile();
    } else if (/^image\//.test(file.meta.mime)) {
      return this.renderImage();
    }

    return null;
  }

  private renderImage() {
    return (
      <DisplayImage
          data={this.props.file.getData().data}
          mime={this.props.file.getData().meta.mime}
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

const mapStateToProps = (state: IReducer, ownProps: IDisplayFileProps): IDisplayFileStateProps => {
  let file: Maybe<File>;

  state.paste.paste.caseOf({
    just: (p: Paste) => { file = new Maybe<File>(p.files[ownProps.index]); },
    nothing: () => { file = new Maybe<File>(null); },
  });

  if (state.paste.paste != null) {
    return {
      file,
    };
  }

  return {
    file: null,
  };
};


const mapDispatchToProps = (dispatch: Dispatch<IReducer>): {} => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFile);
