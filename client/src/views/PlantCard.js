import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function PlantCard() {
  const [plantDetail, setPlantDetail] = useState([]);
  const { pid } = useParams();

    useEffect(() => {
      showDetails();
    }, []);

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

  // const conditionalAdd = () => (user = true) ? <Link to="/AddPlant/:userID" /> : <Link to="/login" /> ;

  return (
    <div>
      {plantDetail.display_pid}
      <p>
        <img src={plantDetail.image_url} alt="display image"></img>
      </p>
      <p>{plantDetail.max_light_mmol}</p>
      <ul>
        <li>Max. temp is: {plantDetail.max_temp}</li>
        <li>Min. temp is: {plantDetail.min_temp}</li>
      </ul>
      <div>
        <Link to="/login" >
          <button type="button" class="btn btn-outline-success">
            Add to my plants
          </button>
        </Link>
        <Link to="/login" >
          <button type="button" class="btn btn-outline-success">
            Add to wishlist
          </button>
        </Link>
      </div>
    </div>
  );
}
