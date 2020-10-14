import React, { useState, useRef } from "react";
import { Table, Tag, Space } from "antd";
import { Switch } from "antd";
import SubChart from "./SubChart";

const imgStyle = {
  width: "32px",
  height: "32px",
};
const tableStyle = {
  height: "400px",
};
function WeatherTable(data) {
  const [switchVal, setControl] = useState(true);
  const switchControl = (e) => {
    console.log(e);
    setControl(e);
  };
  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Temperature",
      dataIndex: "temp",
      key: "temp",
      render: (t) => {
        return t + "°C";
      },
    },
    {
      title: "Weather",
      dataIndex: "weather",
      key: "weather",
    },
    {
      title: "",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => {
        return (
          <img
            style={imgStyle}
            src={" http://openweathermap.org/img/wn/" + icon + ".png"}
          />
        );
      },
    },
  ];

  let tableOrChart = switchVal ? (
    <Table style={tableStyle} columns={columns} dataSource={data.props} />
  ) : (
    <SubChart props={data.props} />
  );
  let content =
    data.props == null ? (
      <div className="notifyBox"></div>
    ) : (
      <React.Fragment>
        <h3>7 Days Forecast</h3>{" "}
        <Switch
          checkedChildren="Table"
          unCheckedChildren="Chart"
          defaultChecked
          onChange={switchControl}
        />
        {tableOrChart}
      </React.Fragment>
    );

  return content;
}

export default WeatherTable;
