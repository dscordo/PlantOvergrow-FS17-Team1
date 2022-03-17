import React, { useState } from "react";
import ExternalApi from "../helpers/ExternalApi";

export default function SearchDetailView() {
  // const [detail, setDetail] = useState("");

  // const handleChange = (e) => {
  //   const { value } = e.target;

  //   setDetail(value);
  //   console.log(e.target.value, "value");
  // };

  // const handleSubmit = (e) => {
  //   //sends item to App through props.addItem
  //   e.preventDefault();
  //   showDetails(detail);
  //   console.log("handlesubmit", detail);
  // };

  // async function showDetails(pid) {
  //   console.log("showDetails", pid);
  //   let response = await ExternalApi.getPlantDetail(pid);
  //   console.log("showDetails", ExternalApi.getPlantDetail(pid));
  //   if (response.ok) {
  //     setDetail(response.data);
  //   } else {
  //     setDetail(null);
  //   }
  // }

//   return (
//     <div className="searchDetail">
//       SearchDetailView
//       <ul>
//         {props.x.map((i) => (
//           <li key={i.pid}>
            // <link to={"/PlantCard/"+i.pid}>{i.pid}</link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
}

