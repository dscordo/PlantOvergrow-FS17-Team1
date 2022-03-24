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


  const deleteTask = async (id) => {
    let options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      let response = await AuthApi.alterContent(`/wishlist/${id}`, options);
      console.log(response);
      if (response.ok) {
        setWishlist(response.data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  };

  //light
  function lightIcon(x) {
    if (x < 2500) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud" viewBox="0 0 16 16">
      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
    </svg>;
    } else if (x >= 2500 && x < 7000) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-sun" viewBox="0 0 16 16">
      <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
      <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
    </svg>;
    } else {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
      <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
    </svg>;
    }
  };

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
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => deleteTask(p.id)}
                    ></button>
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
