import { CodeFile, Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import {
  addHighlightedLine,
  addHighlightedLines,
  setHighlightedLines,
} from "actions/creators";
import Maybe from "helpers/maybe";
import { rangedSelection } from "reducers/highlight";
import { IReducer } from "reducers/index";

const style = require("css/displaycode.css");

export interface IDisplayCodeFileProps {
  index: number;
}

export interface IDisplayCodeFileDispatchProps {
  addHighlightedLine: (line: number) => void;
  addHighlightedLines: (lhs: number, rhs: number) => void;
  setHighlightedLines: (lines: number[]) => void;
}

export interface IDisplayCodeFileStateProps {
  highlight: number[];
  file: Maybe<CodeFile>;
}

type PropsType = IDisplayCodeFileStateProps & IDisplayCodeFileDispatchProps & IDisplayCodeFileProps;

class DisplayCodeFile extends React.Component<PropsType> {
  private code: HTMLElement;

  public componentDidMount() {
    // Cheap workaround to allow themes to have custom looking highlighted line background
    // colors
    const bgcolor: string = getComputedStyle(this.code).getPropertyValue("background-color");
    this.code.style.backgroundColor = "transparent";

    // Set this propety on all trs so that their click transition works.
    const rows: HTMLCollection = this.code.children[0].children[0].children;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < rows.length; i++) {
      (rows[i] as HTMLElement).style.backgroundColor = bgcolor;
    }
  }

  public render() {
    const code = this.getHighlightedContent();
    const file = this.props.file.getData();

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

  private getHighlightedContent() {
    const file: CodeFile = this.props.file.getData();
    let value: string = file.data;

    try {
      if (file.meta.highlight !== "plain" && file.meta.highlight !== "auto") {
        value = hljs.highlight(file.meta.highlight, file.data, true).value;
      } else if (file.meta.highlight === "auto") {
        value = hljs.highlightAuto(file.data).value;
      } else {
        // Escape plain highlighting HTML so we can't execute html in pages.
        value = this.escapeHTMLCharacters(value);
      }
    } catch (e) {
      console.log(e);
      return (<div>file.data</div>);
    }

    try {
      // probably want to optimize this so we don't highlight over and over for every line selection.
      return this.addLineNumbers(value);
    } catch (e) {
      console.log(e);
      return value;
    }
  }

  private addLineNumbers(code: string) {
    const innerTable: JSX.Element[] = code.split("\n").map((e: string, i: number) => {
      return (
        <tr
          key={i}
          className={`${style.line} ${this.props.highlight.includes(i) && style.highlighted}`}
        >
          <td
            onClick={this.createHandleClick(i)}
            className={style.linenumber}
          >
            {i + 1}
          </td>
          <td className={style.code} dangerouslySetInnerHTML={{__html: e}} />
        </tr>
      );
    });

    return (
      <table>
        <tbody>
          <tr>
            <td />
            <td />
          </tr>
          {innerTable}
          <tr>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    );
  }

  private createHandleClick(index: number): (e: React.MouseEvent<undefined>) => void {
    // TODO: Probably don't need to make N new event handlers on every draw.
    return ((e: React.MouseEvent<undefined>): void => {
      const lastIndex: number = this.props.highlight.length > 0 ?
                                this.props.highlight[this.props.highlight.length - 1]
                                : 0;
      if (e.ctrlKey) {
        if (e.shiftKey && this.props.highlight.length > 0) {
          this.props.addHighlightedLines(lastIndex, index);
        } else {
          this.props.addHighlightedLine(index);
        }
      } else {
        if (e.shiftKey && this.props.highlight.length > 0) {
          this.props.setHighlightedLines(rangedSelection([], index, lastIndex));
        } else {
          this.props.setHighlightedLines([index]);
        }
      }
    });
  }

  // https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
  private escapeHTMLCharacters(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

const mapStateToProps = (state: IReducer, ownProps: IDisplayCodeFileProps): IDisplayCodeFileStateProps => {
  let file: Maybe<CodeFile>;

  state.viewPaste.paste.caseOf({
    just: (p: Paste) => file = new Maybe<CodeFile>(p.files[ownProps.index] as CodeFile),
    nothing: () => {
      console.error("Paste has not loaded yet.");
      file = new Maybe<CodeFile>(null);
    },
  });

  return {
    file,
    highlight: state.highlight.files[ownProps.index],
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IReducer>, ownProps: IDisplayCodeFileProps):
                           IDisplayCodeFileDispatchProps => ({
  addHighlightedLine: (line: number) => dispatch(addHighlightedLine(ownProps.index, line)),
  addHighlightedLines: (rhs: number, lhs: number) => dispatch(addHighlightedLines(ownProps.index, rhs, lhs)),
  setHighlightedLines: (lines: number[]) => dispatch(setHighlightedLines(ownProps.index, lines)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCodeFile);
