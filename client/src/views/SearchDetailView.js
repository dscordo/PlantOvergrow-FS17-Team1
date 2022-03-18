import React, { useState } from "react";
import { Link } from "react-router-dom";



export default function SearchDetailView(props) {

  return (
    <div className="searchDetail">
      
      <ul>
        {props.plantResults.map((i) => (
          <li key={i.pid}>
            <Link to={"/PlantCard/"+i.pid}>{i.pid}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

