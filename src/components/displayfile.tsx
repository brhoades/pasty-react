import { File, Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import FileActionsContainer from "../containers/fileactionscontainer";
import Maybe from "../monads/maybe";
import { IReducer } from "../reducers/index";
import DisplayCodeFile from "./displaycodefile";
import DisplayImage from "./displayimage";
import FileCard from "./filecard";

const style = require("css/displayfile.css");


export interface IDisplayFileProps {
  index: number;
}

export interface IDisplayFileDispatchProps {
}

export interface IDisplayFileStateProps {
  file: Maybe<File>;
}

type PropsType = IDisplayFileStateProps & IDisplayFileDispatchProps & IDisplayFileProps;

class DisplayFile extends React.Component<PropsType, undefined> {
  public render() {
    if (this.props.file.isNothing()) {
      return null;
    }

    return (
      <div>
        <FileCard
          header={<h2>{this.props.file.getData().name}</h2>}
          actionbar={
            <FileActionsContainer
              index={this.props.index}
            />
          }
        >
          {/^image\//.test(this.props.file.getData().meta.mime) && this.renderImage()}

          {this.props.file.getData().isReadable() && this.renderCodeFile()}
        </FileCard>
      </div>
    );
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


const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IDisplayFileDispatchProps => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFile);
