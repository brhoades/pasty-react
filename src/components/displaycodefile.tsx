import { CodeFile, Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { range } from "lodash/util";

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

export interface IDisplayCodeState {
  lines: number[],
}

type PropsType = IDisplayCodeFileStateProps & IDisplayCodeFileDispatchProps & IDisplayCodeFileProps;

class DisplayCodeFile extends React.Component<PropsType, IDisplayCodeState> {
  private code: HTMLElement;

  public componentDidMount() {
    // Cheap workaround to allow themes to have custom looking highlighted line background
    // colors
    const bgcolor: string = getComputedStyle(this.code).getPropertyValue('background-color');
    this.code.style.backgroundColor = "transparent";

    // Set this propety on all trs so that their click transition works.
    const rows: HTMLCollection = this.code.children[0].children[0].children;
    for (let i=0; i<rows.length; i++) {
      (rows[i] as HTMLElement).style.backgroundColor = bgcolor;
    }
  }

  public render() {
    const file: CodeFile = this.props.file.getData();
    let value: string = file.data;

    if (file.meta.highlight !== "plain") {
      value = hljs.highlight(file.meta.highlight, file.data, true).value;
    }

    // probably want to optimize this so we don't highlight over and over for every line selection.
    const code: JSX.Element = this.addLineNumbers(value);

    return (
      <pre>
        <code
          className={`${file.meta.highlight !== "plain" && file.meta.highlight} hljs ${style.viewcode}`}
          ref={(ele) => { this.code = ele; }}
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
          className={`${style.line} ${this.state && this.state.lines.includes(i) && style.highlighted}`}
          onClick={this.createHandleClick(i)}
        >
          <td className={style.linenumber}>{i+1}</td>
          <td className={style.code} dangerouslySetInnerHTML={{__html: e}} />
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

  private createHandleClick(index: number): (e: React.MouseEvent<undefined>) => void {
    // TODO: Probably don't need to make N new event handlers on every draw.
    return ((e: React.MouseEvent<undefined>): void => {
      if (e.ctrlKey) {
        if (e.shiftKey && this.state.lines.length > 0) {
          this.setState({
            lines: [...this.state.lines, range(this.state.lines[this.state.lines.length-1], index)],
          });
        } else {
          this.setState({
            lines: [...this.state.lines, index],
          });
        }
      } else {
        this.setState({
          lines: [index],
        });
      }
    });
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
