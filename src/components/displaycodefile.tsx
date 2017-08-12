import { CodeFile } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { Reducer } from "../reducers/index";

declare var hljs: any;
declare var $: any;


export interface IDisplayCodeFileProps {
  index: number;
}

export interface IDisplayCodeFileDispatchProps {
}

export interface IDisplayCodeFileStateProps {
  file: CodeFile;
}

type PropsType = IDisplayCodeFileStateProps & IDisplayCodeFileDispatchProps & IDisplayCodeFileProps;

class DisplayCodeFile extends React.Component<PropsType, undefined> {
  private code: HTMLElement;

  public componentDidMount() {
    if (this.props.file.meta.highlight !== "plain") {
      $(this.code).addClass(this.props.file.meta.highlight);
      hljs.highlightBlock(this.code);
    } else {
      $(this.code).addClass("hljs");
    }
  }

  public render() {
    return (
      <pre>
        <code ref={(code) => { this.code = code; }}>
          {this.props.file.data}
        </code>
      </pre>
    );
  }
}

const mapStateToProps = (state: Reducer, ownProps: IDisplayCodeFileProps): IDisplayCodeFileStateProps => {
  return {
    file: state.paste.paste.files[ownProps.index] as CodeFile,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Reducer>): IDisplayCodeFileDispatchProps => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCodeFile);
