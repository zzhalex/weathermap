import React, { useState } from "react";
import { Switch } from "antd";
import SubChart from "./SubChart";
import SubTable from "./SubTable";

function WeatherTable(data) {
  const [switchVal, setControl] = useState(true);
  const switchControl = (e) => {
    console.log(e);
    setControl(e);
  };

  let tableOrChart = switchVal ? (
    <SubTable data={data.props} />
  ) : (
    <SubChart data={data.props} />
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
