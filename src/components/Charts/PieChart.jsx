import Rechart from "recharts";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import React, { Component } from "react";

class PieChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  render() {
    console.log(this.props.data);

    return (
      <PieChart width={400} height={400}>
        <Pie
          nameKey={this.props.data.data.name}
          dataKey={this.props.data.data.datakey}
          isAnimationActive={false}
          data={this.props.data.data.data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    );
  }
}

export default PieChartComponent;
