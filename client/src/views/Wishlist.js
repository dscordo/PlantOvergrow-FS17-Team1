import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import AddPlant from "./AddPlant";

import ExternalApi from "../helpers/ExternalApi";
import AuthApi from "../helpers/AuthApi";
import Local from '../helpers/Local';



function Wishlist(props) {
  const [myWishlist, setWishlist] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [addplant, setAddPlant] = useState(false);
  const [notes, setNotes] = useState("");
  const [apiDetail, setApiDetail] = useState([]);

  async function showApiDetail(pid) {
    let response = await ExternalApi.showDetails(pid);
    if (response.ok) {
      setApiDetail(response.data);
    } else {
      setApiDetail(null);
    }
  }

  const handleChange = (e) => {
    const { value } = e.target;

    setNotes(value);
    console.log(e.target.value, "value");
  };

  useEffect(() => {
    showWishlist();
  }, []);

  async function showWishlist() {
    let response = await AuthApi.getContent(`/wishlist`);
    if (response.ok) {
      setWishlist(response.data);
      setErrorMsg("");
    } else {
      setWishlist([]);
      setErrorMsg(response.error);
    }
  }
  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!myWishlist) {
    return <h2>Loading...</h2>;
  }

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
        {addplant && <AddPlant pid={myWishlist.pid} />}
        <div className="row row-cols-md-3 g-20">
          {myWishlist.map((p) => (
            <div className="col my-3" key={p.id}>
              <div className="card text-center h-100">
                <div className="card-body">
                  <Link to={`/wishlist/${p.id}`}>
                    <img className="card-img-top" src={p.image_url} />

                    <h5 className="card-title">{p.pid}</h5>
                  </Link>
                  <button onClick={() => showApiDetail(p.pid)}>Show more info</button>
                  <textarea
                    className="card-body"
                    value={notes}
                    onChange={handleChange}
                  >
                    {p.notes}
                  </textarea>
                  <div className="button-wrapper" style={{ padding: "20px" }}>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => setAddPlant(true)}
                    >
                      Add to my plants
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;