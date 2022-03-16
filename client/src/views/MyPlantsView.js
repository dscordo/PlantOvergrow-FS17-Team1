import React, { useEffect, useState } from "react";
import AuthApi from "../helpers/AuthApi";

function MyPlantsView(props) {
  const [myPlants, setMyPlants] = useState([]); //guessing
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    showMyPlants();
  }, []);

  async function showMyPlants() {
    // Get "Members Only" message for authenticated users
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
            <div className="col my-3">
              <div className="card text-center h-100" key={p.id}>
                <div className="card-body">
                  {/* <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                  /> */}

                  <h5 className="card-title">{p.pid}</h5>
                  <p className="card-body">{p.notes}</p>
                </div>
                <div className="card-body"></div>
                {/* <div className="card-footer">
                  <Link to={`/recommendations/${film.id}`}>
                    <a
                      href="`/recommendations/${film.id}`"
                      className="btn btn-primary my-2 btn-outline-light"
                      style={{ backgroundColor: "#b30000" }}
                    >
                      Watched!
                    </a>
                  </Link>
                  <a
                    onClick={() => showFilm(film)}
                    className="btn btn-primary my-2 btn-outline-light"
                    style={{ backgroundColor: "#b30000" }}
                  >
                    More info
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPlantsView;
