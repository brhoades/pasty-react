import * as React from "react";

import { readSettings } from "actions/creators";
import { connect, Dispatch } from "react-redux";
import { IReducer } from "reducers/index";


export interface ISettingsLoaderDispatchProps {
  readSettingsAction: () => void;
}

export class SettingsLoader extends React.Component<ISettingsLoaderDispatchProps, undefined> {
  constructor(props) {
    super(props);

    this.props.readSettingsAction();
  }

  public render() {
    return null;
  }
}

const mapStateToProps = (state: IReducer, ownProps: {}): {}  => ({
});

const mapDispatchToProps = (dispatch: Dispatch<IReducer>): ISettingsLoaderDispatchProps => ({
  readSettingsAction: () => dispatch(readSettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsLoader);
