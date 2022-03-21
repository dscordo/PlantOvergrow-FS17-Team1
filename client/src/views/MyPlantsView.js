import React, { useEffect, useState } from "react";
import AuthApi from "../helpers/AuthApi";
import { Link } from "react-router-dom";
import { DateTime, Interval } from "luxon";

function MyPlantsView(props) {
  //--------------LUXON PLAYGROUND----------------
  let dt = DateTime.local(2017, 5, 15, 8, 30);
  let try1 = DateTime.fromISO("2016-05-25T09:08:34.123");
  let now = DateTime.now();
  let try4 = DateTime.local();

  let try5 = DateTime.now().toString();
  let x = Interval.fromDateTimes(dt, DateTime.now());
  let y = Interval.fromDateTimes(dt, DateTime.now()).toDuration(["days"]);

  //console.log(now, "now");
  //console.log(try5, "now.tostring");

  //console.log(x, "x");
  //console.log(y.values.days, "y");
  //console.log(Math.floor(y.values.days), "y floored");

  //console.log("estos son", try1.c, try2.c);

  //console.log("this is myPlants[0]", myPlants[0]);
  //console.log("this is datetime_full", now.DATETIME_FULL);
  //console.log("this is year", now.year);
  //console.log("this is toISO", now.year);

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
                
                  <h5 className="card-title">{p.pname}</h5>
                  <p className="card-body">{p.notes}</p>
                  <span className="badge rounded-pill bg-light text-dark">
                    {DateTime.fromISO(p.lastwater).toLocaleString()}
                  </span>
                  <span className="badge rounded-pill bg-light text-dark">
                    {DateTime.fromISO(p.lastfert).toLocaleString()}
                  </span>
                  <span className="badge rounded-pill bg-light text-dark">
                    {DateTime.fromISO(p.lastrepot).toLocaleString()}
                  </span>
                  <Link to={`/plantinfo/${p.id}`}>here</Link>
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
