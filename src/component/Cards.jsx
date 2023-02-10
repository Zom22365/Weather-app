import React, { useState } from "react";
const Cards = (props) => {
  return (
    <>
      <div>
        <ul className="list-card">
          <li className="card">
            <h3 className="name-card">Humidity</h3>
            <h1>{props.hum}%</h1>
          </li>
          <li className="card">
            <h3 className="name-card">Wind</h3>
            <h1>{props.wind}</h1>
          </li>
          <li className="card">
            <h3 className="name-card">Vision</h3>
            <h1>{props.view}</h1>
          </li>
          <li className="card">
            <h3 className="name-card">Rain</h3>
            <h1>{props.rain}</h1>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Cards;
