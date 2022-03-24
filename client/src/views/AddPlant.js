import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime, Interval } from "luxon";

import Local from "../helpers/Local";
import ExternalApi from "../helpers/ExternalApi";


function AddPlant(props) {
  let navigate = useNavigate();
  let today = DateTime.now().toFormat("yyyy-MM-dd");
  const [file, setFile] = useState(null);

  const [input, setInput] = useState({
    pid: "",
    pname: "",
    lastwater: today,
    lastfert: today,
    lastrepot: today,
    wfreq: "7",
    fertfreq: "30",
    notes: "",
    userimage: "",
    startdate: today,
  });

  useEffect(() => {
    setInput((state) => ({
      ...state,
      pid: props.pid,
      userimage: props.userimage,
    }));
  }, []);

  const handleChange = (event) => {
    setInput((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  function handleFileChange(event) {
    setFile(event.target.files[0]);
    console.log(file);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (!file) {
      Object.keys(input).forEach((key) => {
        formData.append(key, input[key]);
      });
    } else {
      formData.append("file", file, file.name);
      Object.keys(input).forEach((key) => {
        formData.append(key, input[key]);
      });
    }

    console.log("this is formdata", formData);
    addPlant(formData);
  };

  async function addPlant(formData) {
    let options = {
      method: "POST",
      headers: {},
      body: formData,
    };

    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    try {
      let response = await fetch(`/plantinfo`, options);
      if (response.ok) {
        let data = await response.json();
        console.log("post worked", data);
        navigate("/plantinfo", { replace: true });
      } else {
        console.log("server error:", response.statusText);
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }

  return (
    <div className="AddPlant">
      <h2>Add New Plant</h2>
      <div className="container">
      <div className="form-center px-3 mx-3">
        <form onSubmit={(e) => handleSubmit(e)} className="row g-3">
          <div className="col-md-12">
            <div className="input-group mb-3">
              <span className="input-group-text">Plant name</span>
              <input
                className="form-control"
                name="pname"
                type="text"
                value={input.pname}
                onChange={(e) => handleChange(e)}
                placeholder="Scientific name, your personal name for it.. whatever you want"
              ></input>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <label className="input-group-text">
                It wants water
              </label>
              <select
                className="form-select"
                id="wfreq"
                name="wfreq"
                type="text"
                value={input.wfreq}
                onChange={(e) => handleChange(e)}
              >
                <option>Choose...</option>
                <option value="7">Once a week</option>
                <option value="14">Every two weeks</option>
                <option value="21">Every three weeks</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">I watered it on</span>
              <input
                className="form-control"
                name="lastwater"
                type="date"
                value={input.lastwater}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <label className="input-group-text">
                It wants fertilizing
              </label>
              <select
                className="form-select"
                id="fertfreq"
                name="fertfreq"
                value={input.fertfreq}
                type="text"
                onChange={(e) => handleChange(e)}
              >
                <option>Choose...</option>
                <option value="30">Once a month</option>
                <option value="60">Every two months</option>
                <option value="90">Every three months</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                I fertilized it on
              </span>
              <input
                className="form-control"
                name="lastfert"
                value={input.lastfert}
                type="date"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">Date of purchase</span>
              <input
                className="form-control"
                name="startdate"
                value={input.startdate}
                type="date"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                I repotted it on
              </span>
              <input
                className="form-control"
                name="lastrepot"
                value={input.lastrepot}
                type="date"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <textarea
                className="form-control"
                id="notes"
                style={{ height: "100px" }}
                name="notes"
                value={input.notes}
                type="text"
                onChange={(e) => handleChange(e)}
              ></textarea>
              <label htmlFor="notes" className="col-sm-2 col-form-label">
                Notes
              </label>
            </div>
          </div>

          <div className="col-12">
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
              <label className="input-group-text" htmlFor="userimage">
                Add an image
              </label>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default AddPlant;
