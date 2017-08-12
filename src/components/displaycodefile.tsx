import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { CodeFile } from 'pasty-core'

import { Reducer } from '../reducers/index'
declare var hljs: any, $: any;


export interface DisplayCodeFileProps {
  index: number
}

export interface DisplayCodeFileDispatchProps {
}

export interface DisplayCodeFileStateProps {
  file: CodeFile
}

type PropsType = DisplayCodeFileStateProps & DisplayCodeFileDispatchProps & DisplayCodeFileProps;

class DisplayCodeFile extends React.Component<PropsType, undefined> {
  private code: HTMLElement;

  componentDidMount() {
    if (this.props.file.meta.highlight != 'plain') {
      $(this.code).addClass(this.props.file.meta.highlight);
      hljs.highlightBlock(this.code);
    } else {
      $(this.code).addClass('hljs');
    }
  }

  render() {
    return (
      <pre>
        <code ref={(code) => { this.code = code; }}>
          {this.props.file.data}
        </code>
      </pre>
    );
  }
}

const mapStateToProps = (state: Reducer, ownProps: DisplayCodeFileProps): DisplayCodeFileStateProps => {
  return {
    file: state.paste.paste.files[ownProps.index] as CodeFile
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Reducer>): DisplayCodeFileDispatchProps => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCodeFile);
