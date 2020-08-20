import React from "react";
import "zingchart/es6";
import "zingchart-react/dist/modules/zingchart-depth.min.js";
import configTemp from "./configTemplate.js";
import ZingChart from "zingchart-react";

class Line extends React.Component {
  constructor(props) {
    super(props);
    let config = configTemp;
    config.series = [
      {
        values: this.props.series,
      },
    ];
    config.title.text = this.props.title;
    config.subtitle.text = this.props.text;
    config.scaleX.label.text = this.props.scaleXName;
    config.scaleY.label.text = this.props.scaleYName;
    config.plot.tooltip.text =
      this.props.textOnMouseX + ": %kt<br>" + this.props.textOnMouseY + ": %vt";
    this.state = { config: config };
    this.chart = React.createRef();
  }

  render() {
    return (
      <div className="chartContainer">
        <ZingChart ref={this.chart} data={this.state.config} />
      </div>
    );
  }
}

export default Line;