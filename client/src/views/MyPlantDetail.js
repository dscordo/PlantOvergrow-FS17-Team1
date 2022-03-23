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
  const [apiDetail, setApiDetail] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    showPlantDetail();
  }, []);

  async function showPlantDetail() {
    let response = await AuthApi.getContent(`/plantinfo/${id}`);
    if (response.ok) {
      setPlantDetail(response.data);
      setErrorMsg("");
    } else {
      setPlantDetail();
      setErrorMsg(response.error);
    }
    // showApiDetail(response.data.pid); untested
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

  async function showApiDetail(pid) {
    let response = await ExternalApi.showDetails(pid);
    if (response.ok) {
      setApiDetail(response.data);
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

  return (
    <div className="MyPlantDetail">
      <div className="Wrapper">
        {plantDetail.map((p) => (
          <div className="container" key={p.id}>
            <div className="row" style={{ paddingBottom: "20px" }}>
              <h3>{p.pname}</h3>
            </div>
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
                        Last watered
                      </th>
                      <td width="33%">
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
                      <th scope="row" colspan="2">
                        Recommended frequency{" "}
                      </th>
                      <td colspan="1">every {p.wfreq} days</td>
                    </tr>
                    <tr>
                      <th scope="row">Last fertilized</th>
                      <td>
                        {Math.floor(
                          Interval.fromDateTimes(
                            DateTime.fromISO(p.lastfert),
                            DateTime.now()
                          ).toDuration(["days"]).values.days
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
                      <th scope="row" colspan="2">
                        Recommended frequency
                      </th>
                      <td> every {p.fertfreq} days</td>
                    </tr>
                    <tr>
                      <th scope="row">Last repotted</th>
                      <td>
                        {Math.floor(
                          Interval.fromDateTimes(
                            DateTime.fromISO(p.lastrepot),
                            DateTime.now()
                          ).toDuration(["days"]).values.days
                        )}{" "}
                        days ago
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
                      <th scope="row">Notes</th>
                      <td colspan="2">
                        {editNotes ? (
                          <td colspan="2">
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
                                onClick={() => handleSubmit(patchPlant)} //maybe empty this out.
                              >
                                Save
                              </button>
                            </div>
                          </td>
                        ) : (
                          <div>
                            <table class="table mb-0">
                              <tbody>
                                <tr>
                                  <td>{p.notes}</td>
                                </tr>
                                <tr>
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
          </div>
        ))}
      </div>
    </div>
  );
}
