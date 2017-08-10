import * as React from 'react'
import { connect, Dispatch } from 'react-redux'


import { Reducer } from '../reducers/index'
import { getPaste } from '../actions/creators'

export interface ViewPasteStateProps {
}

export interface ViewPasteDispatchProps {
  getPasteAction: (id: string, key: string) => void
}

export interface ViewPasteProps {
  match: {
    params: {
      id: string,
      key: string,
    }
  }
}

type PropsType = ViewPasteStateProps & ViewPasteDispatchProps & ViewPasteProps;

export class ViewPaste extends React.Component<PropsType, undefined> {
  componentWillMount() {
    this.props.getPasteAction(this.props.match.params.id, this.props.match.params.key);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = (state: Reducer, ownProps: ViewPasteProps): ViewPasteStateProps => ({
});

const mapDispatchToProps = (dispatch: Dispatch<Reducer>): ViewPasteDispatchProps => ({
  getPasteAction: (id: string, key: string) => dispatch(getPaste(id, key, `https://pasty.brod.es/get/${id}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPaste);

