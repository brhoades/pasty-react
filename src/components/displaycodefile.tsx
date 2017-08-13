import { CodeFile, Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { registerClickHandlers } from "../ts/code-helpers";
import Maybe from "../monads/maybe";
import { IReducer } from "../reducers/index";

const style = require("css/displaycode.css");


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
  public componentDidMount() {
  }

  public render() {
    const file: CodeFile = this.props.file.getData();
    let value: string = file.data;

    if (file.meta.highlight !== "plain") {
      value = hljs.highlight(file.meta.highlight, file.data, true).value;
    }

    const code: JSX.Element = this.addLineNumbers(value);

    return (
      <pre>
        <code
          className={`${file.meta.highlight !== "plain" && file.meta.highlight} hljs ${style.viewcode}`}
        >
          {code}
        </code>
      </pre>
    );
  }

  private addLineNumbers(code: string) {
    const innerTable: JSX.Element[] = code.split("\n").map((e: string, i: number) => {
      return (
        <tr
          key={i}
          data-line={i+1}
          className={style.line}
          onClick={this.registerClickHandler(i+1)}
        >
          <td className="number">{i+1}</td>
          <td className="code" dangerouslySetInnerHTML={{__html: e}} />
        </tr>
      );
    });

    return (
      <table>
        <tbody>
          {innerTable}
        </tbody>
      </table>
    );
  }

  private registerClickHandler(line: number) {
    return (e: Event) => {
      $(e.target);
    };
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
