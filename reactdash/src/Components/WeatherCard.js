import React, { useState } from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

function WeatherCard(data) {
  let content =
    data.props != null ? (
      <Card style={{ width: 300, marginTop: 16, height: 140 }}>
        <Meta
          avatar={
            <Avatar
              src={
                " http://openweathermap.org/img/wn/" +
                data.props.icon +
                "@2x.png"
              }
            />
          }
          title={data.props.name}
          description={data.props.weather}
        />
      </Card>
    ) : (
      <div className="WeatherCard"></div>
    );
  return content;
}

export default WeatherCard;
