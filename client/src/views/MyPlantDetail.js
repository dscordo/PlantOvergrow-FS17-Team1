import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DateTime, Interval } from "luxon";

import AuthApi from "../helpers/AuthApi";
import Local from "../helpers/Local";
import ExternalApi from "../helpers/ExternalApi";

export default function MyPlantDetail() {
  const [plantDetail, setPlantDetail] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [editNotes, setEditNotes] = useState(false);
  const [patchPlant, setPatchPlant] = useState({});
  const [apiDetail, setApiDetail] = useState();
  const [file, setFile] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    showPlantDetail();
  }, []);

  useEffect(() => {
    if (plantDetail.length) {
      showApiDetail(plantDetail[0].pid);
    }
  }, [plantDetail]);

  async function showPlantDetail() {
    let response = await AuthApi.getContent(`/plantinfo/${id}`);
    if (response.ok) {
      setPlantDetail(response.data);
      setErrorMsg("");
    } else {
      setPlantDetail();
      setErrorMsg(response.error);
    }
    // console.log("pid", response.data.pid);
    // showApiDetail(response.data.pid); //untested
  }

  const handleChange = (e) => {
    setPatchPlant({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    doPatch(id, patchPlant);
    setEditNotes(false);
  };

  //patch working

  async function doPatch(id, modification) {
    let options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modification),
    };

    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    let data = null;
    try {
      let response = await fetch(`/plantinfo/${id}`, options);
      if (response.ok) {
        data = await response.json();
        setPatchPlant("");
        setPlantDetail(data);
      } else {
        console.log("server error:", response.statusText);
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }

  function waterStatus(a, b) {
    if (a < b) {
      return "green";
    } else if (a >= b && a < 2 * b) {
      return "yellow";
    } else {
      return "brown";
    }
  }

  function fertStatus(a, b) {
    if (a < b) {
      return "green";
    } else if (a >= b && a < 2 * b) {
      return "yellow";
    } else {
      return "brown";
    }
  }

  //light
  function lightIcon(x) {
    if (x < 2500) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cloud"
          viewBox="0 0 16 16"
        >
          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
        </svg>
      );
    } else if (x >= 2500 && x < 7000) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cloud-sun"
          viewBox="0 0 16 16"
        >
          <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
          <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-brightness-high-fill"
          viewBox="0 0 16 16"
        >
          <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
        </svg>
      );
    }
  }

  //this shows an error in the console if there is no API info
  async function showApiDetail(pid) {
    let response = await ExternalApi.showDetails(pid);
    if (response) {
      setApiDetail(response);
    } else {
      setApiDetail(null);
    }
  }

  /* } */
  function displayImage(image) {
    if (!image || image === "undefined") {
      return "https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHBsYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
    } else if (image.startsWith("http")) {
      return image;
    } else {
      return "http://localhost:5001/images/" + image;
    }
  }
  //-----luxon---
  /* {
    DateTime.fromISO(p.lastwater).toLocaleString(DateTime.DATETIME_SHORT);
  } */
  //------
  /* async function patchPlant(formData) {
    let options = {
      method: "PATCH",
      headers: {},
      body: formData, //
    };

    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    try {
      let response = await fetch(`/plantinfo/image`, options);
      if (response.ok) {
        let data = await response.json();
console.log("patch image worked", data);
        navigate("/plantinfo", { replace: true });
      } else {
        console.log("server error:", response.statusText);
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }

  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log("this is handlesubmit2", file);
    const formData = new FormData();
    formData.append("file", file, file.name);
    patchPlant(formData);
  };

  function handleFileChange(event) {
    setFile(event.target.files[0]);
    console.log(file);
  }
 */
  return (
    <div className="MyPlantDetail">
      <div className="Wrapper">
        {plantDetail.map((p) => (
          <div className="container" key={p.id}>
            <div className="row" style={{ paddingBottom: "20px" }}>
              <h3>{p.pname}</h3>
            </div>
            {apiDetail ? (
              <div className="row row-cols-sm-1 row-cols-md-2">
                <div className="col-md-6">
                  <img
                    className="card-img-top"
                    src={displayImage(p.userimage)}
                    alt="display image"
                    style={{ width: "300px" }}
                  />
                </div>
                <div className="col-md-6">
                  <table className="table table-success table-borderless table-striped">
                    <tbody>
                      <tr>
                        <th scope="row" width="33%">
                          Scientific name:
                        </th>
                        <td width="33%" colSpan="2">
                          {apiDetail.display_pid}
                        </td>
                      </tr>
                      <tr>
                        <td scope="row" width="50%">
                          {lightIcon(apiDetail.min_light_lux)}-
                          {lightIcon(apiDetail.max_light_lux)}
                        </td>
                        <td width="50%" colSpan="2">
                          {apiDetail.min_temp}º-
                          {apiDetail.max_temp}ºC
                        </td>
                      </tr>

                      <tr>
                        <td scope="row" width="50%">
                          {apiDetail.min_soil_moist}%-
                          {apiDetail.max_soil_moist}% soil moisture
                        </td>
                        <td width="50%" colSpan="2">
                          {apiDetail.min_env_humid}%-
                          {apiDetail.max_env_humid}% air humidity
                        </td>
                      </tr>
                      <tr>
                        <td scope="row" width="50%" colSpan="2">
                          I watered it{" "}
                          {Math.floor(
                            Interval.fromDateTimes(
                              DateTime.fromISO(p.lastwater),
                              DateTime.now()
                            ).toDuration(["days"]).values.days
                          )}{" "}
                          days ago
                        </td>

                        <td width="33%">
                          <form>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              name="lastwater"
                              onClick={(e) =>
                                doPatch(p.id, { lastwater: "pitipum" })
                              }
                            >
                              {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-droplet-fill"
                                  viewBox="0 0 16 16"
                                  style={{
                                    color: waterStatus(
                                      Math.floor(
                                        Interval.fromDateTimes(
                                          DateTime.fromISO(p.lastwater),
                                          DateTime.now()
                                        ).toDuration(["days"]).values.days
                                      ),
                                      p.wfreq
                                    ),
                                  }}
                                >
                                  <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
                                </svg>
                              }
                            </button>
                          </form>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2" className="fst-italic">
                          It wants water every {p.wfreq} days.
                        </td>
                        <td colSpan="1"></td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2">
                          I fertilized it{" "}
                          {Math.floor(
                            Interval.fromDateTimes(
                              DateTime.fromISO(p.lastfert),
                              DateTime.now()
                            ).toDuration(["years", "months", "days"]).values
                              .days
                          )}{" "}
                          days ago
                        </td>

                        <td>
                          <form>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              name="lastfert"
                              onClick={(e) =>
                                doPatch(p.id, { lastfert: "pitipum" })
                              }
                            >
                              {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-plus-circle-fill"
                                  viewBox="0 0 16 16"
                                  style={{
                                    color: fertStatus(
                                      Math.floor(
                                        Interval.fromDateTimes(
                                          DateTime.fromISO(p.lastfert),
                                          DateTime.now()
                                        ).toDuration(["days"]).values.days
                                      ),
                                      p.fertfreq
                                    ),
                                  }}
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                              }
                            </button>
                          </form>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2" className="fst-italic">
                          It wants fertilizer every {p.fertfreq} days.
                        </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2">
                          I repotted it on{" "}
                          {DateTime.fromISO(p.lastrepot).toFormat("dd-MM-yyyy")}
                        </td>

                        <td>
                          <form>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              name="lastrepot"
                              onClick={(e) =>
                                doPatch(p.id, { lastrepot: "pitipum" })
                              }
                            >
                              {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-house-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                                  />
                                </svg>
                              }
                            </button>
                          </form>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2">
                          It's been with me since{" "}
                          {DateTime.fromISO(p.lastrepot).toFormat("dd-MM-yyyy")}
                        </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          {editNotes ? (
                            <td colSpan="2">
                              <div className="input-group">
                                <input
                                  type="text"
                                  name="notes"
                                  value={patchPlant.notes}
                                  onChange={handleChange}
                                />
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  onClick={() => handleSubmit(patchPlant)}
                                >
                                  Save
                                </button>
                              </div>
                            </td>
                          ) : (
                            <div>
                              <table className="table mb-0">
                                <tbody>
                                  <tr>
                                    <td colSpan="3">{p.notes}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-success text-nowrap"
                                        onClick={() => setEditNotes(true)}
                                      >
                                        Edit notes
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="row row-cols-sm-1 row-cols-md-2">
                <div className="col-md-6">
                  <img
                    className="card-img-top"
                    src={displayImage(p.userimage)}
                    alt="display image"
                    style={{ width: "300px" }}
                  />
                </div>
                <div className="col-md-6">
                  <table className="table table-success table-borderless table-striped">
                    <tbody>
                      <tr>
                        <td scope="row" width="50%" colSpan="2">
                          I watered it{" "}
                          {Math.floor(
                            Interval.fromDateTimes(
                              DateTime.fromISO(p.lastwater),
                              DateTime.now()
                            ).toDuration(["days"]).values.days
                          )}{" "}
                          days ago
                        </td>

                        <td width="33%">
                          <form>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              name="lastwater"
                              onClick={(e) =>
                                doPatch(p.id, { lastwater: "pitipum" })
                              }
                            >
                              {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-droplet-fill"
                                  viewBox="0 0 16 16"
                                  style={{
                                    color: waterStatus(
                                      Math.floor(
                                        Interval.fromDateTimes(
                                          DateTime.fromISO(p.lastwater),
                                          DateTime.now()
                                        ).toDuration(["days"]).values.days
                                      ),
                                      p.wfreq
                                    ),
                                  }}
                                >
                                  <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
                                </svg>
                              }
                            </button>
                          </form>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2" className="fst-italic">
                          It wants water every {p.wfreq} days.
                        </td>
                        <td colSpan="1"></td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2">
                          I fertilized it{" "}
                          {Math.floor(
                            Interval.fromDateTimes(
                              DateTime.fromISO(p.lastfert),
                              DateTime.now()
                            ).toDuration(["years", "months", "days"]).values
                              .days
                          )}{" "}
                          days ago
                        </td>

                        <td>
                          <form>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              name="lastfert"
                              onClick={(e) =>
                                doPatch(p.id, { lastfert: "pitipum" })
                              }
                            >
                              {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-plus-circle-fill"
                                  viewBox="0 0 16 16"
                                  style={{
                                    color: fertStatus(
                                      Math.floor(
                                        Interval.fromDateTimes(
                                          DateTime.fromISO(p.lastfert),
                                          DateTime.now()
                                        ).toDuration(["days"]).values.days
                                      ),
                                      p.fertfreq
                                    ),
                                  }}
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                              }
                            </button>
                          </form>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2" className="fst-italic">
                          It wants fertilizer every {p.fertfreq} days.
                        </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2">
                          I repotted it on{" "}
                          {DateTime.fromISO(p.lastrepot).toFormat("dd-MM-yyyy")}
                        </td>

                        <td>
                          <form>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              name="lastrepot"
                              onClick={(e) =>
                                doPatch(p.id, { lastrepot: "pitipum" })
                              }
                            >
                              {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-house-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                                  />
                                </svg>
                              }
                            </button>
                          </form>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row" colSpan="2">
                          It's been with me since{" "}
                          {DateTime.fromISO(p.lastrepot).toFormat("dd-MM-yyyy")}
                        </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          {editNotes ? (
                            <td colSpan="2">
                              <div className="input-group">
                                <input
                                  type="text"
                                  name="notes"
                                  value={patchPlant.notes}
                                  onChange={handleChange}
                                />
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  onClick={() => handleSubmit(patchPlant)}
                                >
                                  Save
                                </button>
                              </div>
                            </td>
                          ) : (
                            <div>
                              <table className="table mb-0">
                                <tbody>
                                  <tr>
                                    <td colSpan="3">{p.notes}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-success text-nowrap"
                                        onClick={() => setEditNotes(true)}
                                      >
                                        Edit notes
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
