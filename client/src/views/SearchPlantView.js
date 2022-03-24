import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import SearchDetailView from "./SearchDetailView";




export default function SearchPlantView() {
    const [plant, setPlant] = useState("")
    const [plantResults, setPlantResults] = useState([])
    const [plantOneResult, setPlantOneResult] = useState([])
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value} = e.target;

        setPlant(value);
        console.log(e.target.value, "value");
    }

    const handleSubmit = (e) => {
      //sends item to App through props.addItem
        e.preventDefault();
        showResults(plant);
        console.log("handlesubmit", plant);
    };

    async function showResults() {
      console.log("showResults", plant);
      let response = await fetch(`/externalApi/getPlants/${plant}`);
      if (response.ok) {
        let result = await response.json();
        console.log("SHOW RESULT", typeof result.count);
        if (result.count === 1) {
          setPlantOneResult(result.results);
          let pid = result.results[0].pid
          navigate(`/PlantCard/${pid}`)
          console.log("SHOW RESULT ONE", result);
        } else if (result.count > 1){
          setPlantResults(result.results)
          console.log("SHOW RESULTS", result);
        }
      } else {
        setPlantResults(null);
      }
    }

    return (
      <div className="plantSearch">
        <div className="row row-cols-sm-1 row-cols-md-2">
        <div className="col-md-6" style={{ padding: "10px" }}>
        <h2>Welcome to Plant Overgrow!</h2>
          <p>To get started, use the search bar to find a plant you already have or would like to have and add them to My Plants or Wishlist.</p>
          <p>In My Plants you can keep track of watering and fertilizing schedules, the last time you repotted, add a photo of your own plant or notes.</p>
          <p><small><Link to="/login">Login</Link> or <Link to="/register">Register</Link> to add plants.</small></p>
        </div>
        <div className="col-md-6">
        <h3>Search Plants</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group col-md-6" style={{ margin: "10px" }}>
              <input type="text" name="plantName" className="form-control" placeholder="Type to search..." value={plant} onChange={handleChange} />
          <button type="submit" className="btn btn-success">Search Plant</button>
          </div>
        </form>
    
        <SearchDetailView plantResults={plantResults}/>
        </div>
        </div>
        </div>
    );
}
