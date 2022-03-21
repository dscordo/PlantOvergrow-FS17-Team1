import React, { useEffect, useState } from "react";
import AuthApi from "../helpers/AuthApi";
import { Link } from "react-router-dom";
import { DateTime, Interval } from "luxon";

function MyPlantsView(props) {
  //--------------LUXON PLAYGROUND----------------
  let dt = DateTime.local(2022, 3, 20, 8, 30);
  let wCurrentInterval = Math.floor(
    Interval.fromDateTimes(DateTime.fromISO(dt), DateTime.now()).toDuration([
      "days",
    ]).values.days
  );
  let fakeWFreq = 5;

  function waterStatus(a, b) {
    if (a < b) {
      return "green";
    } else if (a >= b && a < 2 * b) {
      return "#e6e600";
    } else {
      return "brown";
    }
  }

  function fertStatus(a, b) {
    if (a < b) {
      return "green";
    } else if (a >= b && a < 2 * b) {
      return "#e6e600";
    } else {
      return "brown";
    }
  }

  /* function waterStatus2(a, b) {
    a < b ? "green" : a > b && a < 2 * b ? "yellow" : "brown";
  }
  console.log(
    waterStatus2(wCurrentInterval, fakeWFreq),
    "this is water status 2"
  ); //doesn't work but should? */

  //----------------------

  const [myPlants, setMyPlants] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    showMyPlants();
  }, []);

  async function showMyPlants() {
    let response = await AuthApi.getContent("/plantinfo");
    if (response.ok) {
      setMyPlants(response.data);
      setErrorMsg("");
    } else {
      setMyPlants([]);
      setErrorMsg(response.error);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!myPlants) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="MyPlants">
      <div className="container">
        <h1>My Plants</h1>
        <div className="row row-cols-md-3 g-20">
          {myPlants.map((p) => (
            <div className="col my-3" key={p.id}>
              <div className="card text-center h-100">
                <div className="card-body">
                  <h5 className="card-title"> <Link to={`/plantinfo/${p.id}`}>{p.pname}</Link></h5>
                  <table className="table table-success table-borderless table-striped">
                  <tbody>
                  <tr>
                  <th scope="row">Notes</th>
                  <td>{p.notes}</td>
                   </tr>
                   <tr>
                  <th scope="row">Watering status</th>
                  <td>
                  <span className="badge rounded-pill bg-light text-dark">
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
                    {/* {DateTime.fromISO(p.lastwater).toLocaleString()} */}
                  </span>
                  </td>
                   </tr>
                   <tr>
                  <th scope="row">Recommended frequency</th>
                  <td>
                  every {p.wfreq} days
                  </td>
                   </tr>
                   <tr>
                  <th scope="row">Fert status</th>
                  <td>
                  <span className="badge rounded-pill bg-light text-dark">
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
                    {/* {DateTime.fromISO(p.lastfert).toLocaleString()} */}
                  </span>
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
    </div>
  );
}

export default MyPlantsView;
