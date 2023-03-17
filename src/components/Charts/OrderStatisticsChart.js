import React, { useRef, useEffect, PureComponent } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

import * as d3 from "d3";
import { Chart } from "react-d3-library";

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
          fontSize={12}
          fontFamily="Arial"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}
const OrderStatisticsChart = (props) => {
  const graphRef = useRef(null);
  const formatYAxisTick = (value) => {
    return `GHC${value.toFixed(2)}`;
  };
  return (
    <BarChart
      width={500}
      height={300}
      data={props.weeklyOrderChart}
      margin={{
        top: 20,
        right: 0,
        left: 10,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        height={50}
        interval={0}
        tick={<CustomizedAxisTick />}
      />
      {/* <YAxis tickFormatter={formatYAxisTick} /> */}
      <Bar
        dataKey="totalAmount"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {props.weeklyOrderChart.map((entry, index) => (
          <Cell key={`cell-${index}`} fill="#ea8255" />
        ))}
      </Bar>
    </BarChart>
  );
};

export default OrderStatisticsChart;
