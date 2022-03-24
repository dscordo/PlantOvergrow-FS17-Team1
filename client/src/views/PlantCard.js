import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import AddPlant from "./AddPlant";
import './PlantCard.css';
import Local from "../helpers/Local";


export default function PlantCard(props) {
  const [addplant, setAddPlant] = useState(false);
  const [plantDetail, setPlantDetail] = useState([]);
  const { pid } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    showDetails();
  }, []);



  async function showDetails() {
    console.log("showDetails", pid);
    let response = await fetch(`/externalApi/getPlantDetail/${pid}`);
    if (response.ok) {
      let result = await response.json();
      setPlantDetail(result);
    } else {
      setPlantDetail(null);
    }
  };

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
    };

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
  };
  //light
  function lightIcon(x) {
    if (x < 2500) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud" viewBox="0 0 16 16">
      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
    </svg>;
    } else if (x >= 2500 && x < 7000) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-sun" viewBox="0 0 16 16">
      <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
      <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
    </svg>;
    } else {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
      <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
    </svg>;
    }
  };

  return (
    <div className="PlantCard">
      <div className="container">
        <div className="row justify-content-around">
        <div className="col-md-6">
        <img
          src={plantDetail.image_url}
          alt="display image"
        />
        </div>
        <div className="col-md-4 float-lg-end">
        <h5>{plantDetail.display_pid}</h5>
        <ul className="list-group">
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
        <div className="button-wrapper">
          {props.user ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => setAddPlant(true)}
              style={{ margin: "5px"}}
            >
              Add to my plants
            </button>
          ) : (
            <Link to="/login">
              <button type="button" className="btn btn-success" style={{ margin: "5px"}}>
                Add to my plants
              </button>
            </Link>
          )}
          {props.user ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={addWishPlant}
              >
                Add to wishlist
              </button>
          ) : (
            <Link to="/login">
              <button type="button" className="btn btn-success">
                Add to wishlist
              </button>
            </Link>
          )}
           </div>
        </div>
        <div className="row align-items-center">
        <div className="align-self-center" style={{ width: "100%", margin: "auto", paddingRight: "10px"}}>
        {addplant && <AddPlant pid={pid} userimage={plantDetail.image_url} />}
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
