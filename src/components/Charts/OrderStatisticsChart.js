import React, { useRef, useEffect, PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Box, Typography } from "@mui/material";

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

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log(payload[0]);
    return (
      <Box
        p={1}
        sx={{
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8.8px)",
          WebkitBackdropFilter: "blur(8.8px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
          webkitBackdropFilter: "blur(5px)",
        }}
      >
        <Typography variant="body2">
          {label}({payload[0].payload.day})
        </Typography>
        <Typography variant="body2">{`Total: GHC${payload[0].payload.totalAmount}`}</Typography>
        <Typography variant="body2">{`Orders#: ${payload[0].payload.count}`}</Typography>
      </Box>
    );
  }

  return null;
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
    // <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={500}
      height={300}
      data={props.revenueChartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10,
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
      {/* <YAxis /> */}
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line
        type="monotone"
        dataKey="totalAmount"
        stroke="#f8bd49"
        label={<CustomizedLabel />}
      />
    </LineChart>
    // </ResponsiveContainer>
  );
};

export default OrderStatisticsChart;
