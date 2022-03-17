import React, { useState } from "react";
import ExternalApi from "../helpers/ExternalApi";

export default function SearchDetailView() {
  const [detail, setDetail] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setDetail(value);
    console.log(e.target.value, "value");
  };

  const handleSubmit = (e) => {
    //sends item to App through props.addItem
    e.preventDefault();
    showDetails(detail);
    console.log("handlesubmit", detail);
  };

  async function showDetails(pid) {
    console.log("showDetails", pid);
    let response = await ExternalApi.getPlants(pid);
    console.log("showDetails", ExternalApi.getPlants(pid));
    if (response.ok) {
      setDetail(response.data);
    } else {
      setDetail(null);
    }
  }

  return <div>earchDetailView</div>;
}
