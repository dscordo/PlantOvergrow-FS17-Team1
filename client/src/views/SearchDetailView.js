import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchDetailView(props) {
  return (
    <div className="searchDetail">
      
      <ul className="list-group">
        {props.plantResults.map((i) => (
          <li key={i.pid} className="list-group-item list-group-item-success">
            <Link to={"/PlantCard/" + i.pid}>{i.pid}</Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
