import React, { useEffect, useState } from "react";
import AuthApi from "../helpers/AuthApi";
import { Link } from "react-router-dom";

import MyPlantDetail from "./MyPlantDetail";

function MyPlantsView(props) {
  const [myPlants, setMyPlants] = useState([]); //guessing
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    showMyPlants();
  }, []);

  async function showMyPlants() {
    let response = await AuthApi.getContent("/plantinfo");
    if (response.ok) {
      setMyPlants(response.data);
      setErrorMsg("");
    } else {
      setMyPlants([]);
      setErrorMsg(response.error);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!myPlants) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="MyPlants">
      <div className="container">
        <h1>My Plants</h1>
        <div className="row row-cols-md-3 g-20">
          {myPlants.map((p) => (
            <div className="col my-3" key={p.id}>
              <div className="card text-center h-100">
                <div className="card-body">
                  {/* <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                  /> */}

                  <h5 className="card-title">{p.pid}</h5>
                  <p className="card-body">{p.notes}</p>
                  <span className="badge rounded-pill bg-light text-dark">
                    {p.lastwater}
                  </span>
                  <span className="badge rounded-pill bg-light text-dark">
                    {p.lastfert}
                  </span>
                  <span className="badge rounded-pill bg-light text-dark">
                    {p.lastrepot}
                  </span>
                  <Link to={`/plantinfo/${p.id}/${p.pid}`}>here</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPlantsView;
