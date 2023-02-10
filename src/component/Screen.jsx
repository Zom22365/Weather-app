import axios from "axios";
import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import "../sass/spin.scss";

const Screen = () => {
  const [address, setAddress] = useState("HaNoi");
  const [dis, setDis] = useState("");

  const [info, setInFo] = useState({
    city: "Undefined",
    avgTemp: "0",
    condition: "Undefined",
    avghumidity: "0",
    wind: "0",
    view: "0",
    totalprecip: "0",
  });

  function getData(data) {
    setDis("lds-dual-ring");
    axios({
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/history.json",
      params: { q: data, dt: "2023-02-09", lang: "en" },
      headers: {
        "X-RapidAPI-Key": "8caecac29emshbac1aaa76feb412p1d629cjsn743686848771",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    }).then((res) => {
      if (res) {
        setDis("");
      }
      setInFo({
        ...info,
        city: res.data.location.name,
        avgTemp: res.data.forecast.forecastday[0].day.avgtemp_c,
        condition: res.data.forecast.forecastday[0].day.condition.text,
        avghumidity: res.data.forecast.forecastday[0].day.avghumidity,
        wind: res.data.forecast.forecastday[0].day.maxwind_kph,
        view: res.data.forecast.forecastday[0].day.avgvis_km,
        totalprecip: res.data.forecast.forecastday[0].day.totalprecip_mm,
      });
    });
  }

  useEffect(() => {
    getData("hanoi");
  }, []);

  const handlChange = (e) => {
    setAddress(e.target.value);
  };
  const handlSubmit = async () => {
    await getData(address);
  };

  return (
    <>
      <div className="screen">
        <div className="block-search">
          <input
            type="text"
            placeholder="Nhập tên thành phố..."
            onChange={handlChange}
          />
          <i class="fa-solid fa-magnifying-glass" onClick={handlSubmit}></i>
        </div>
        <div className="main">
          <div className="display-info">
            <h2 className="city">{info.city}</h2>
            <h1 className="temp">
              {info.avgTemp}
              <sup>o</sup>C
            </h1>
            <h3>{info.condition}</h3>
          </div>
          <Cards
            hum={info.avghumidity}
            wind={info.wind}
            view={info.view}
            rain={info.totalprecip}
          ></Cards>
        </div>
      </div>
      <div id={dis}></div>
    </>
  );
};
export default Screen;
