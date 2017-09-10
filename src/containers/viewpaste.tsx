import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Reducer } from '../reducers/index'
import { returntypeof } from 'react-redux-typescript';


const mapStateToProps = (state: Reducer, ownProps: ViewPasteProps) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<Reducer>) => ({
});

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

export interface ViewPasteProps {
  match: {
    params: {
      id: string,
      key: string,
    }
  }
}

type PropsType = typeof stateProps & typeof dispatchProps & ViewPasteProps;

export class ViewPaste extends React.Component<PropsType, undefined> {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPaste);
