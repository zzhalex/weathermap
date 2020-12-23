import React from "react";
import { Line } from "@ant-design/charts";

function SubChart(props) {
  console.log(props);
  let data = props.data;
  const config = {
    data,
    height: 400,
    width: 600,
    xField: "date",
    yField: "temp",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };
  return <Line {...config} />;
}

export default SubChart;
