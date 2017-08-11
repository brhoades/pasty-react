import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { File } from 'pasty-core'

import { Reducer } from '../reducers/index'
import DisplayImage from './displayimage'
import DisplayCodeFile from './displaycodefile'


export interface DisplayFileProps {
  index: number
}

export interface DisplayFileDispatchProps {
}

export interface DisplayFileStateProps {
  file: File | null
}

type PropsType = DisplayFileStateProps & DisplayFileDispatchProps & DisplayFileProps;

class DisplayFile extends React.Component<PropsType, undefined> {
  constructor(props) {
    super(props);
  }

  render() {
    // Keep a flag true for our initial file. If we unmount
    // we flip this value and stop rendering.
    if (this.props.file == null) {
      return null;
    }

    return (
      <div>
        <h3>{this.props.file.name}</h3>
        {
          /^image\//.test(this.props.file.meta.mime) &&
          (
            <DisplayImage
              data={this.props.file.data}
              mime={this.props.file.meta.mime}
            />
          )
        }
        {
          this.props.file.isReadable() &&
          (
            <DisplayCodeFile
              index={this.props.index}
            />
          )
        }
      </div>
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
