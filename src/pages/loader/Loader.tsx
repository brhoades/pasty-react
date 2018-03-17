import * as React from "react";

import Dimmer from "semantic-ui-react/dist/es/modules/Dimmer";

import { default as LoaderCircle } from "components/Loader";

export interface ILoaderState {
  progress: number;
  stageOne: boolean;
}

export default class Loader extends React.Component<{}, ILoaderState> {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      stageOne: true,
    };

    setInterval(() => {
      const nextValue = (this.state.progress + 1 ) % 101;
      console.log(nextValue);
      this.setState({
        progress: nextValue,
        stageOne: nextValue < this.state.progress ? !this.state.stageOne : this.state.stageOne,
      });
    }, 50);
  }

  public render() {
    const { progress, stageOne } = this.state;
    const style = {
      height: "200px",
      marginLeft: "auto",
      marginRight: "auto",
      width: "200px",
    };

    return (
      <Dimmer active={true} page={true}>
        <div style={style}>
          <LoaderCircle
            progress={progress % 100}
            indeterminateLabel="LOADING"
            label={`${progress.toFixed(0)}%`}
            subLabel={stageOne ? "Stage 1" : "Stage 2"}
            secondStage={!stageOne}
          />
        </div>
      </Dimmer>
    );
  }
}
