import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import AddPlant from "./AddPlant";

import AuthApi from "../helpers/AuthApi";
import Local from '../helpers/Local';


function Wishlist() {
  const [myWishlist, setWishlist] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [addplant, setAddPlant] = useState(false);
  // let pid = 

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


  return (
    <div className="Wishlist">
      <div className="container">
        <h1>Wishlist</h1>
        {addplant && <AddPlant pid={myWishlist.pid} />}
        <div className="row row-cols-md-3 g-20">
          {myWishlist.map((p) => (
            <div className="col my-3" key={p.id}>
              {/* {addplant && <AddPlant pid={p.pid} />} */}
              <div className="card text-center h-100">
                <div className="card-body">
                  <Link to={`/wishlist/${p.id}`}>
                    <img className="card-img-top" src={p.image_url} />

                    <h5 className="card-title">{p.pid}</h5>
                  </Link>
                  <p className="card-body">{p.notes}</p>
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