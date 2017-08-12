import { CodeFile, Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import Maybe from "../monads/maybe";
import { IReducer } from "../reducers/index";

declare var hljs: any;
declare var $: any;


export interface IDisplayCodeFileProps {
  index: number;
}

export interface IDisplayCodeFileDispatchProps {
}

export interface IDisplayCodeFileStateProps {
  file: Maybe<CodeFile>;
}

type PropsType = IDisplayCodeFileStateProps & IDisplayCodeFileDispatchProps & IDisplayCodeFileProps;

class DisplayCodeFile extends React.Component<PropsType, undefined> {
  private code: HTMLElement;

  public componentDidMount() {
    const file: CodeFile = this.props.file.getData();

    if (file.meta.highlight !== "plain") {
      $(this.code).addClass(file.meta.highlight);
      hljs.highlightBlock(this.code);
    } else {
      $(this.code).addClass("hljs");
    }
  }

  public render() {
    const file: CodeFile = this.props.file.getData();

    return (
      <pre>
        <code ref={(code) => { this.code = code; }}>
          {file.data}
        </code>
      </pre>
    );
  }
}

const mapStateToProps = (state: IReducer, ownProps: IDisplayCodeFileProps): IDisplayCodeFileStateProps => {
  let file: Maybe<CodeFile>;

  state.paste.paste.caseOf({
    just: (p: Paste) => file = new Maybe<CodeFile>(p.files[ownProps.index] as CodeFile),
    nothing: () => {
      console.error("Paste has not loaded yet.");
      file = new Maybe<CodeFile>(null);
    },
  });

  return {
    file,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IDisplayCodeFileDispatchProps => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCodeFile);
