import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Icon from "semantic-ui-react/dist/es/elements/Icon";

import { getFileByIndexDefault, IFileByIndexPropsType } from "../../helpers/fileprops";
import { IReducer } from "../../reducers/index";


export interface IIconOrTextProps {
  icon: string;
  text: string;
  inverted?: boolean;
  size?: string;
  link?: boolean;
}

export interface IIconOrTextStateProps {
  fonticons: boolean;
}

type PropsType = IIconOrTextProps & IIconOrTextStateProps;

const IconOrText = (props: PropsType) => {
  if (props.fonticons) {
    return <Icon name={props.icon} inverted={props.inverted} size={props.size} link={props.link} />;
  }

  return <div>{props.text}</div>;
};

const mapStateToProps = (state: IReducer, ownProps: IIconOrTextProps): IIconOrTextStateProps => ({
  fonticons: state.settings.fonticons,
});

export default connect(mapStateToProps, () => ({}))(IconOrText);
