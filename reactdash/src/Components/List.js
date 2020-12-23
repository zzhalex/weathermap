import React, { useState, useEffect } from "react";
import { List, Card, Avatar } from "antd";
import {} from "antd";

import axios from "axios";
const styleList = {
  margin: "12px",
};
const { Meta } = Card;

function SavedList() {
  const [list, setlist] = useState([]);
  useEffect(() => {
    axios.get("/defweather").then(function (res) {
      console.log(res.data);
      setlist(res.data);
    });
  }, []);
  return (
    <List
      style={styleList}
      grid={{ gutter: 16, column: 4 }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.title}>
            <Meta
              avatar={
                <Avatar
                  src={
                    " http://openweathermap.org/img/wn/" + item.icon + "@2x.png"
                  }
                />
              }
              title={item.name}
              description={item.weather}
            />
            <p>{item.temp}°C</p>
          </Card>
        </List.Item>
      )}
    />
  );
}

export default SavedList;
