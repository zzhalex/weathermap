import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function SubChart(data) {
  console.log(data);
  return (
    <LineChart
      width={730}
      height={250}
      data={data.props}
      margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis dataKey="temp" />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="temp" stroke="#ff7300" />
    </LineChart>
  );
}

export default SubChart;
