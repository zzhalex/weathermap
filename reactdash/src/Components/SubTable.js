import React from "react";
import { List, Avatar } from "antd";

function SubTable(props) {
  return (
    <List
      style={{ width: 600 }}
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={` http://openweathermap.org/img/wn/${item.icon}.png`}
              />
            }
            title={`${item.date}`}
            description={`${item.temp} °C`}
          />
          <div>{item.weather}</div>
        </List.Item>
      )}
    />
  );
}

export default SubTable;
