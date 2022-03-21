import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import AddPlant from "./AddPlant";


export default function PlantCard(props) {
  const [addplant, setAddPlant] = useState(false);
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


  // const conditionalAdd = () => props.user ? <Link to="/addplant/:pid" /> : <Link to="/login" /> ;

  return (
    <div className="PlantCard">
      <div className="container">
     <h3> {plantDetail.display_pid} </h3>
      
        <img src={plantDetail.image_url} alt="display image" style={{ width: '300px' }}></img>
    
      <p>{plantDetail.max_light_mmol}</p> 
      <ul>
        <li>Max. temp is: {plantDetail.max_temp}</li>
        <li>Min. temp is: {plantDetail.min_temp}</li>
      </ul>
      <div className="button-wrapper" style={{ padding: '20px' }}>
        { props.user ?
         ( 
          <button type="button" className="btn btn-outline-success" onClick={() => setAddPlant(true) }>
          Add to my plants
        </button> 
        
        )
          : 
          (
          <Link to="/login"> 
          <button type="button" className="btn btn-outline-success">
            Add to my plants
          </button>
          </Link>
          )
          }
          { props.user ?
         ( <Link to="/wishlist/" > 
          <button type="button" className="btn btn-outline-success">
          Add to wishlist
        </button> 
        </Link>
        )
          : 
          (
          <Link to="/login"> 
          <button type="button" className="btn btn-outline-success">
            Add to wishlist
          </button>
          </Link>
          )
          }
      </div>
      { addplant && <AddPlant pid={pid}
      />}
      </div>
    </div>
  );
}
