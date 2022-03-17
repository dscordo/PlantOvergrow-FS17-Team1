import React, { useEffect, useState } from "react";
import AuthApi from "../helpers/AuthApi";
import { useParams } from "react-router-dom";
import Local from "../helpers/Local";

export default function MyPlantDetail(props) {
  const [plantDetail, setPlantDetail] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [editNotes, setEditNotes] = useState(false);
  const [patchPlant, setPatchPlant] = useState({});

  let { id, pid } = useParams();

  useEffect(() => {
    showPlantDetail();
  }, []);

  async function showPlantDetail() {
    let response = await AuthApi.getContent(`/plantinfo/${id}`);
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

  //patch working

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
      let response = await fetch(`/plantinfo/${id}`, options);
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
    <div className="MyPlantDetail">
      <div className="Wrapper">
        {plantDetail.map((p) => (
          <div className="Container" key={p.id}>
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
                  onClick={() => handleSubmit(patchPlant)} //maybe empty this out.
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
            <ul>
              <li>Last watered: 
                {p.lastwater}
                <form>
                  <button
                    type="button"
                    className="btn btn-success"
                    name="lastwater"
                    onClick={(e) => doPatch(p.id, { lastwater: "pitipum" })}
                  >
                   {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-droplet-fill" viewBox="0 0 16 16">
  <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
</svg>}
                  </button>
                </form>
              </li>
              <li> Last fertilize: 
                {p.lastfert}
                <form>
                  <button
                    type="button"
                    className="btn btn-success"
                    name="lastfert"
                    onClick={(e) => doPatch(p.id, { lastfert: "pitipum" })}
                  >
                    {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
</svg>}
                  </button>
                </form>
              </li>
              <li> Last repot: 
                {p.lastrepot}
                <form>
                  <button
                    type="button"
                    className="btn btn-success"
                    name="lastrepot"
                    onClick={(e) => doPatch(p.id, { lastrepot: "pitipum" })}
                  >
                   <svg id="Flower_Pot" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"><path d="M207.4375,304.895a19.808,19.808,0,0,0,27.0582,7.25l1.6963-.9794v1.9587a19.808,19.808,0,0,0,39.616,0v-1.9587l1.6963.9794a19.808,19.808,0,0,0,19.808-34.3085l-1.6963-.9794,1.6963-.9792a19.8081,19.8081,0,0,0-19.808-34.3086l-1.6963.98V240.59a19.808,19.808,0,1,0-39.616,0v1.9588l-1.6963-.98a19.8081,19.8081,0,0,0-19.808,34.3086l1.6963.9792-1.6963.9794A19.808,19.808,0,0,0,207.4375,304.895ZM256,255.8784a20.979,20.979,0,1,1-20.9795,20.9795A21.003,21.003,0,0,1,256,255.8784Z"/><path d="M383.1953,130.4282H128.8047a4.5,4.5,0,0,0-4.5,4.5v55.94a4.5,4.5,0,0,0,4.5,4.5h13.7244l30.0764,164.9384A25.9038,25.9038,0,0,0,198.1,381.5718H313.9a25.9038,25.9038,0,0,0,25.4941-21.2647l30.0764-164.9384h13.7244a4.5,4.5,0,0,0,4.5-4.5v-55.94A4.5,4.5,0,0,0,383.1953,130.4282ZM330.541,358.6919a16.9078,16.9078,0,0,1-16.6406,13.88H198.1a16.9078,16.9078,0,0,1-16.6406-13.88L151.677,195.3687H360.323Zm48.1543-172.3232H133.3047v-46.94H378.6953Z"/></svg>
                  </button>
                </form>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
