import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Local from "./helpers/Local";
import AuthApi from "./helpers/AuthApi";
// import Api from './helpers/Api'; // Laura

import NavBar from "./components/NavBar";

import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ErrorView from "./views/ErrorView";
import MyPlantsView from "./views/MyPlantsView";
import MyPlantDetail from "./views/MyPlantDetail";
import ProfileView from "./views/ProfileView";
import UsersView from "./views/UsersView";
import Wishlist from "./views/Wishlist";
import SearchPlantView from "./views/SearchPlantView";
import SearchDetailView from "./views/SearchDetailView";
import PlantCard from "./views/PlantCard";
import AddPlant from "./views/AddPlant";
import WishDetail from "./views/WishDetail";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const navigate = useNavigate();
  const [regErrorMsg, setRegErrorMsg] = useState("");

  async function doLogin(username, password) {
    let response = await AuthApi.loginUser(username, password);
    if (response.ok) {
      Local.saveUserInfo(response.data.token, response.data.user);
      setUser(response.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // We don't need the next line; the Logout <NavLink> will redirect for us
    // navigate('/');
  }

  async function doRegister(newUser) {
    let response = await AuthApi.registerUser(newUser);
    if (response.ok) {
      setRegErrorMsg("");
      navigate("/");
    } else {
      setRegErrorMsg("Register failed");
    }
  }

  return (
    <div className="App">
      <NavBar user={user} logoutCb={doLogout} />

      <div className="container">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/users" element={<UsersView />} />
          <Route
            path="/users/:userId"
            element={
              <PrivateRoute>
                <ProfileView />
              </PrivateRoute>
            }
          />
          <Route
            path="/plantinfo"
            element={
              <PrivateRoute>
                <MyPlantsView />
              </PrivateRoute>
            }
          />
          <Route
            path="/plantinfo/:id"
            element={
              <PrivateRoute>
                <MyPlantDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/wishlist/:id"
            element={
              <PrivateRoute>
                <WishDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/addplant"
            element={
              <PrivateRoute>
                <AddPlant />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoginView
                loginCb={(u, p) => doLogin(u, p)}
                loginError={loginErrorMsg}
              />
            }
          />
          <Route
            path="/register"
            element={<RegisterView registerCb={(uo) => doRegister(uo)} />}
          />
          <Route path="/SearchPlant" element={<SearchPlantView />} />
          <Route path="/SearchView" element={<SearchDetailView />} />
          <Route path="/PlantCard/:pid" element={<PlantCard />} />
          <Route
            path="*"
            element={<ErrorView code="404" text="Page not found" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
