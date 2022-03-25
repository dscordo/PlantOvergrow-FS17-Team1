import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthApi from "../helpers/AuthApi";

function ProfileView(props) {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  let { userId } = useParams();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    let response = await AuthApi.getUser(userId);
    if (response.ok) {
      setUser(response.data);
      setErrorMsg("");
    } else {
      setUser(null);
      setErrorMsg(response.error);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="ProfileView">
      <div className="container">
      <div className="row" style={{ paddingBottom: "20px" }}>
      <h1>My Profile</h1>
      </div>
      <div className="row row-cols-sm-1 row-cols-md-2">
      <div className="col-md-7">
      <img
      src="https://images.unsplash.com/photo-1523810192022-5a0fb9aa7ff8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80"
      alt="profile image"
      className="img-thumbnail rounded"
      style={{ width: "200px" }}/>

    </div>
    <div className="col-md-3"  style={{ paddingTop: "20px" }}>
      <ul className="list-group">
     
      <li className="list-group-item list-group-item-success">ID: {user.id}</li>
   
      <li className="list-group-item list-group-item-success">Username: {user.name}</li>

      <li className="list-group-item list-group-item-success">Email: {user.email}</li>
      </ul>
      </div>
      </div>
      </div>
    </div>
  );
}

export default ProfileView;
