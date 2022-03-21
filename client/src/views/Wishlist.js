import React, { useEffect, useState } from 'react';
import AuthApi from "../helpers/AuthApi";
import Local from '../helpers/Local';


function Wishlist() {
  const [myWishlist, setWishlist] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

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
        <div className="row row-cols-md-3 g-20">
          {myWishlist.map((p) => (
            <div className="col my-3" key={p.id}>
              <div className="card text-center h-100">
                <div className="card-body">
                  <img
                    className="card-img-top"
                    src={p.image_url}
                  />

                  <h5 className="card-title">{p.pid}</h5>
                  <p className="card-body">{p.notes}</p>
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