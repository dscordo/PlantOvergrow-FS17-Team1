import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import AddPlant from "./AddPlant";

import Local from "../helpers/Local";

export default function PlantCard(props) {
  const [addplant, setAddPlant] = useState(false);
  const [plantDetail, setPlantDetail] = useState([]);
  const { pid } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    showDetails();
  }, []);
  //this one
  async function showDetails() {
    console.log("showDetails", pid);
    let response = await fetch(`/externalApi/getPlantDetail/${pid}`);
    if (response.ok) {
      let result = await response.json();
      // console.log("SHOW RESULT", typeof result.count)
      setPlantDetail(result);
    } else {
      setPlantDetail(null);
    }
  }

  // POST
  async function addWishPlant() {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: pid,
        image_url: plantDetail.image_url,
      }),
    };

    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    try {
      let response = await fetch(`/wishlist`, options);
      if (response.ok) {
        let data = await response.json();
        console.log("post worked", data);
        navigate("/Wishlist", { replace: true });
      } else {
        console.log("server error:", response.statusText);
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }
  //light
  function lightIcon(x) {
    if (x < 2500) {
      return "shade";
    } else if (x >= 2500 && x < 7000) {
      return "indirect sun";
    } else {
      return "sun";
    }
  }

  return (
    <div className="PlantCard">
      <div className="container">
        <h3> {plantDetail.display_pid} </h3>

        <img
          src={plantDetail.image_url}
          alt="display image"
          style={{ width: "300px" }}
        ></img>
        <h5>{plantDetail.display_pid}</h5>
        <ul>
          <li className="list-group-item list-group-item-success">
            Light: {lightIcon(plantDetail.min_light_lux)}-
            {lightIcon(plantDetail.max_light_lux)}
          </li>
          <li className="list-group-item list-group-item-success">
            Temp in C: {plantDetail.min_temp}º-{plantDetail.max_temp}º
          </li>
          <li className="list-group-item list-group-item-success">
            Air Humidity: {plantDetail.min_env_humid}%-
            {plantDetail.max_env_humid}%
          </li>
          <li className="list-group-item list-group-item-success">
            Soil Moisture: {plantDetail.min_soil_moist}%-
            {plantDetail.max_soil_moist}%
          </li>
        </ul>
        <div className="button-wrapper" style={{ padding: "20px" }}>
          {props.user ? (
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => setAddPlant(true)}
            >
              Add to my plants
            </button>
          ) : (
            <Link to="/login">
              <button type="button" className="btn btn-outline-success">
                Add to my plants
              </button>
            </Link>
          )}
          {props.user ? (
            <Link to="/wishlist/">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={addWishPlant}
              >
                Add to wishlist
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button type="button" className="btn btn-outline-success">
                Add to wishlist
              </button>
            </Link>
          )}
        </div>
        {addplant && <AddPlant pid={pid} />}
      </div>
    </div>
  );
}
