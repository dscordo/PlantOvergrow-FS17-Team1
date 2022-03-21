import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
        <h3>Search Plants</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="">
              Search plant
              <input type="text" name="plantName" value={plant} onChange={handleChange} />
            </label>
          </div>
          <button type="submit" className="btn btn-outline-success">Search Plant</button>
        </form>
    
        <SearchDetailView plantResults={plantResults}/>
        </div>
    );
}
