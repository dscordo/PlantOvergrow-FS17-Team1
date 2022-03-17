import React, { useEffect, useState } from "react";
import ExternalApi from '../helpers/ExternalApi';


export default function SearchPlantView() {
    const [plant, setPlant] = useState("")

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

    async function showResults(plant) {
        console.log("showResults", plant);
        let response = await ExternalApi.getPlants(plant);
        console.log("showResults2", ExternalApi.getPlants(plant));
        if (response.ok) {
          setPlant(response.data);
        } else {
          setPlant(null);
        }
    };

    return (
        <div className="plantSearch">
            SearchPlantView
            <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label htmlFor="">
                    Search plant
                    <input type="text" name="plantName" value={plant} onChange={handleChange} />
                </label>
            </div>
            <button type="submit">Search Plant</button>
            </form>
        </div>
    );
}
