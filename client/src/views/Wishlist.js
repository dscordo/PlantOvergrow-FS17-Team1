import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";

import AddPlant from "./AddPlant";

import ExternalApi from "../helpers/ExternalApi";
import AuthApi from "../helpers/AuthApi";
import Local from "../helpers/Local";

function Wishlist(props) {
  const [myWishlist, setWishlist] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [addplant, setAddPlant] = useState(false);
  const [completeInfo, setCompleteInfo] = useState([]);
  const [apiDetail, setApiDetail] = useState([]);
  let mergedStates = [];

  const [pid, setPid] = useState(""); //these are for sending info to addplant
  const [image, setImage] = useState("");

  useEffect(() => {
    showWishlist();
  }, []);

  useEffect(() => {
    callApi();
  }, [myWishlist]);

  async function showWishlist() {
    let response = await AuthApi.getContent(`/wishlist`);
    if (response.ok) {
      setWishlist(response.data);
      setErrorMsg("");
      //console.log("1");
    } else {
      setWishlist([]);
      setErrorMsg(response.error);
    }
    //console.log("2", myWishlist);
    // callApi();
  }
  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }
  if (!myWishlist) {
    return <h2>Loading...</h2>;
  }

  const callApi = async () => {
    //console.log("mywishlist 3", myWishlist);
    try {
      const promises = myWishlist.map((p) =>
        fetch(`/externalApi/getPlantDetail/${p.pid}`).then((res) => res.json())
      );
      const results = await Promise.all(promises);
      //console.log("Api detail", results);
      // apiD = results;
      // setApiDetail(results);
      let mergedStates = myWishlist.map((plant) => {
        let apiResults = results.find((element) => element.pid === plant.pid);
        return { ...plant, ...apiResults };
      });
      //console.log("mergeStates", mergedStates);
      setCompleteInfo(mergedStates);
    } catch (error) {
      console.log(error);
    }
  };
  function lightIcon(x) {
    if (x < 2500) {
      return "shade";
    } else if (x >= 2500 && x < 7000) {
      return "indirect sun";
    } else {
      return "sun";
    }
  };

  // const handleChange = (e) => {
  //   const { value } = e.target;

  //   setNotes(value);
  //   console.log(e.target.value, "value");
  // };

  // async function changeNote() {
  //   let options = {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       notes: notes.notes,
  //     }),
  //   };

  //   let token = Local.getToken();
  //   if (token) {
  //     options.headers["Authorization"] = "Bearer " + token;
  //   }

  //   try {
  //     let response = await fetch(`/wishlist`, options);
  //     if (response.ok) {
  //       let data = await response.json();
  //       console.log("post worked", data);
  //       navigate("/Wishlist", { replace: true });
  //     } else {
  //       console.log("server error:", response.statusText);
  //     }
  //   } catch (e) {
  //     console.log("network error:", e.message);
  //   }
  // }

  return (
    <div className="Wishlist">
      <div className="container">
        <h1>Wishlist</h1>
        {addplant && <AddPlant pid={pid} userimage={image} />}
        {!completeInfo.length ? (
          <div className="row row-cols-md-3 g-20">
            {myWishlist.map((p) => (
              <div className="col my-3" key={p.id}>
                <div className="card text-center h-100">
                  <div className="card-body">
                    <img className="card-img-top" src={p.image_url} />

                    <h5 className="card-title">{p.pid}</h5>

                    <div className="button-wrapper" style={{ padding: "20px" }}>
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => setAddPlant(true)}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row row-cols-md-3 g-20">
            {completeInfo.map((p) => (
              <div className="col my-3" key={p.id}>
                <div className="card text-center h-100">
                  <div className="card-body">
                    <img className="card-img-top" src={p.image_url} />

                    <h5 className="card-title">{p.display_pid}</h5>
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-success">
                        Light: {lightIcon(p.min_light_lux)}-
                        {lightIcon(p.max_light_lux)}
                      </li>

                      <li className="list-group-item list-group-item-success">
                        Temp in C: {p.min_temp}º-
                        {p.max_temp}º
                      </li>

                      <li className="list-group-item list-group-item-success">
                        Air Humidity: {p.min_env_humid}%-
                        {p.max_env_humid}%
                      </li>
                      <li className="list-group-item list-group-item-success">
                        Soil Moisture: {p.min_soil_moist}%-
                        {p.max_soil_moist}%
                      </li>
                    </ul>

                    <div className="button-wrapper" style={{ padding: "20px" }}>
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => {
                          setAddPlant(true);
                          setPid(p.pid);
                          setImage(p.image_url);
                        }}
                      >
                        Add to my plants
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
