import * as React from "react";

const style = require("css/loader.css");

export interface ILoaderState {
  indeterminate: boolean;
  transitioning: boolean;
}

export interface ILoaderProps {
  label: string;
  progress: number;
}

export default class Loader extends React.Component<ILoaderProps, ILoaderState> {
  private path;
  private container;
  private outline;

  constructor(props) {
    super(props);

    this.state = {
      indeterminate: true,
      transitioning: false,
    };
  }

  public shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  public componentWillReceiveProps(nextProps) {
    // Do not allow updates until transition from indetermiante is finished.
    if (this.state.transitioning) {
      console.log("Currently transitioning; bailing");
      return;
    }

    if (this.props.progress === 0 && nextProps.progress !== 0) {
      console.log("Starting transition");
      // transition to a loading circle from an indeterminate loading circle
      const oneOffTransition = (e) => {
        if (e.currentTarget.dataset.triggered) {
          return;
        }
        e.currentTarget.dataset.triggered = true;

        this.path.classList.remove(style["loader-path-anim"]);
        this.container.classList.remove(style["circular-loader-anim"]);
        this.path.style.strokeDashoffset = 150;
        this.container.classList.add(style["start-progress-load"]);
        this.outline.style.display = "block";

        // Stop blocking progress updates
        this.setState({
          indeterminate: false,
          transitioning: false,
        });
      };

      this.path.addEventListener("animationiteration", oneOffTransition);
      this.path.addEventListener("webkitAnimationIteration", oneOffTransition);
      this.setState({
        transitioning: true,
      });

    } else if (this.props.progress !== 0) {
      this.progress(nextProps.progress);
    }
  }

  public render() {
    return (
      <svg className={style["circular-loader"]} viewBox="25 25 50 50" >
        <g
          ref={(container) => this.container = container}
          id="loader-container"
          className={style["circular-loader-anim"]}
        >
          <circle
            ref={(outline) => this.outline = outline}
            className={style["loader-outline"]}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
          <circle
            ref={(path) => this.path = path}
            className={`${style["loader-path"]} ${style["loader-path-anim"]}`}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#70c542"
            strokeWidth="2"
          />
        </g>
        <text
          x="100%"
          y="100%"
          dy="0.25em"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="#fff"
          className={style["circle-label-text"]}
        >
          {this.props.label}
        </text>
      </svg>
    );
  }

  private progress(value: number) {
    this.path.style.strokeDashoffset = 150 - value * 1.26;
  }
}
