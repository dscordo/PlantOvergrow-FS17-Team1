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
