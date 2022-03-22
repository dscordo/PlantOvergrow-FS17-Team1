import React, { useEffect, useState } from "react";
import AuthApi from "../helpers/AuthApi";
import { useParams } from "react-router-dom";
import Local from "../helpers/Local";

export default function WishDetail() {
  const [plantDetail, setPlantDetail] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [editNotes, setEditNotes] = useState(false);
  const [patchPlant, setPatchPlant] = useState({});
  let { id } = useParams();

  useEffect(() => {
    showPlantDetail();
  }, []);

  async function showPlantDetail() {
    let response = await AuthApi.getContent(`/wishlist/${id}`);
    if (response.ok) {
      setPlantDetail(response.data);
      setErrorMsg("");
    } else {
      setPlantDetail();
      setErrorMsg(response.error);
    }
  }

  const handleChange = (e) => {
    setPatchPlant({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    doPatch(id, patchPlant);
    setEditNotes(false);
  };

  async function doPatch(id, modification) {
    let options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modification),
    };

    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    let data = null;
    try {
      let response = await fetch(`/wishlist/${id}`, options);
      if (response.ok) {
        data = await response.json();
        setPatchPlant("");
        setPlantDetail(data);
      } else {
        console.log("server error:", response.statusText);
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }
  return (
    <div className="WishDetail">
      <div className="Wrapper">
        {plantDetail.map((p) => (
          <div className="Container" key={p.id}>
            <img className="card-img-top" src={p.image_url} 
            alt="display image"
            style={{ width: "300px" }}/>
            <h3>{p.pid}</h3>
            {editNotes ? (
              <div className="input-group">
                <input
                  type="text"
                  name="notes"
                  value={patchPlant.notes}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => handleSubmit(patchPlant)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>{p.notes}</p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setEditNotes(true)}
                >
                  Edit notes
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
