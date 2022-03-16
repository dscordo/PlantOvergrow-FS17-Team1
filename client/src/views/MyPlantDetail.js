import React, { useEffect, useState } from "react";
import AuthApi from "../helpers/AuthApi";
import { useParams } from "react-router-dom";

export default function MyPlantDetail(props) {
  let emptyplant = {
    id: 1,
    userid: "",
    pid: "",
    lastwater: "",
    lastfert: "",
    lastrepot: "",
    notes: "",
    userimage: "",
    startdate: "",
  };
  const [plantDetail, setPlantDetail] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  /* let p = props.x; */
  let { id, pid } = useParams();
  const [edit, setEdit] = useState();

  useEffect(() => {
    showPlantDetail();
  }, []);

  async function showPlantDetail() {
    let response = await AuthApi.getContent(`/plantinfo/${id}`);
    if (response.ok) {
      console.log(response.data, "hello");
      setPlantDetail(response.data);
      setErrorMsg("");
    } else {
      setPlantDetail();
      setErrorMsg(response.error);
    }
  }

  //trying from restaurants

  async function doEdit(id) {
    let edit = {
      /* pid: "",
      lastwater: "",
      lastfert: "",
      lastrepot: "",
      notes: "",
      userimage: "",
      startdate: "", */
    };

    let options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    };

    let data = null;
    try {
      let response = await fetch(`/plantinfo/${id}`, options);
      if (response.ok) {
        data = await response.json();
        setEdit("");
        /* setItems(data); */
      } else {
        console.log("server error:", response.statusText);
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }

  return (
    <div className="MyPlantDetail">
      <div className="Wrapper">
        {plantDetail.map((p) => (
          <div className="Container" key={p.id}>
            <h3>{p.pid}</h3>
            <p>{p.notes}</p>
            <ul>
              <li>{p.lastwater}</li>
              <li>{p.lastfert}</li>
              <li>{p.lastrepot}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
