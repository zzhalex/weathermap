import React, { useState } from "react";
import { Card, Avatar } from "antd";

const { Meta } = Card;

function WeatherCard(data) {
  let content =
    data.props != null ? (
      <React.Fragment>
        <h3>Current Weather</h3>
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
          <p>{data.props.temp}°C</p>
        </Card>
      </React.Fragment>
    ) : (
      <div className="notifyBox">
        Please input the name of city to search the weather.
      </div>
    );
  return content;
}

export default WeatherCard;
