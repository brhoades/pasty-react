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
  file: File
}

type PropsType = DisplayFileStateProps & DisplayFileDispatchProps & DisplayFileProps;

class DisplayFile extends React.Component<PropsType, undefined> {
  render() {
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
          <DisplayCodeFile
            text={this.props.file.data}
            language={this.props.file.meta.highlight}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: Reducer, ownProps: DisplayFileProps): DisplayFileStateProps => ({
  file: state.paste.paste.files[ownProps.index]
});

const mapDispatchToProps = (dispatch: Dispatch<Reducer>): DisplayFileDispatchProps => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFile);
