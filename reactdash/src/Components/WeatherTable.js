import React from "react";
import { Table, Tag, Space } from "antd";
import { head } from "request";

//{temp: 289.68, weather: "overcast clouds", icon: "04d"}
const imgStyle = {
  width: "32px",
  height: "32px",
};
const tableStyle = {
  height: "400px",
};
function WeatherTable(data) {
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
  let content =
    data.props == null ? (
      <div className="notifyBox"></div>
    ) : (
      <React.Fragment>
        <h3>7 Days Forecast</h3>
        <Table style={tableStyle} columns={columns} dataSource={data.props} />
      </React.Fragment>
    );

  return content;
}

export default WeatherTable;
