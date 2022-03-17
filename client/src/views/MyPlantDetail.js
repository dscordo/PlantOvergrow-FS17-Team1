import React, { useEffect, useState } from "react";
import AuthApi from "../helpers/AuthApi";
import { useParams } from "react-router-dom";
import Local from "../helpers/Local";

export default function MyPlantDetail(props) {
  const [plantDetail, setPlantDetail] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [editNotes, setEditNotes] = useState(false);
  const [edit, setEdit] = useState();
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
    //e.preventDefault(); //ask about this
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
    //console.log("patch log", id, patchPlant, options.body);

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
              <li>
                {p.lastwater}
                <form>
                  <button
                    type="button"
                    className="btn btn-success"
                    name="lastwater"
                    onClick={(e) => doPatch(p.id, { lastwater: "pitipum" })}
                  >
                    I just watered!
                  </button>
                </form>
              </li>
              <li>
                {p.lastfert}
                <form>
                  <button
                    type="button"
                    className="btn btn-success"
                    name="lastfert"
                    onClick={(e) => doPatch(p.id, { lastfert: "pitipum" })}
                  >
                    I just fertilized
                  </button>
                </form>
              </li>
              <li>
                {p.lastrepot}
                <form>
                  <button
                    type="button"
                    className="btn btn-success"
                    name="lastrepot"
                    onClick={(e) => doPatch(p.id, { lastrepot: "pitipum" })}
                  >
                    I just repotted
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
