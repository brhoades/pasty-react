import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Paste } from 'pasty-core'

import DisplayFile from '../components/displayfile'

import { STATE } from '../reducers/paste'
import { Reducer } from '../reducers/index'
import { getPaste, clearPaste } from '../actions/creators'

export interface ViewPasteStateProps {
  state: STATE,
  paste: Paste | null,
}

export interface ViewPasteDispatchProps {
  getPasteAction: (id: string, key: string) => void,
  clearPasteAction: (id: string) => void
}

export interface ViewPasteProps {
  location: {
    pathname: string,
  },
  match: {
    params: {
      id: string,
      key: string,
    }
  }
}

type PropsType = ViewPasteStateProps & ViewPasteDispatchProps & ViewPasteProps;

export class ViewPaste extends React.Component<PropsType, undefined> {
  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id != newProps.match.params.id
        || this.props.match.params.key != newProps.match.params.key) {
      this.props.getPasteAction(newProps.match.params.id, newProps.match.params.key);
    }
  }

  componentWillUnmount() {
    this.props.clearPasteAction(this.props.match.params.id);
  }

  render() {
    if (this.props.state != STATE.VIEWING) {
      return null;
    }

    return (
      <div>
        <h2>{this.props.paste.name}</h2>
        {
          this.props.paste.files.map((f, index) => {
            return (
              <DisplayFile
                key={f.id}
                index={index}
              />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state: Reducer, ownProps: ViewPasteProps): ViewPasteStateProps => ({
  state: state.paste.downloadState,
  paste: state.paste.paste,
});

const mapDispatchToProps = (dispatch: Dispatch<Reducer>): ViewPasteDispatchProps => ({
  getPasteAction: (id: string, key: string) => dispatch(getPaste(id, key, `https://pasty.brod.es/get/${id}`)),
  clearPasteAction: (id: string) => dispatch(clearPaste(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPaste);

