const BASE_URL = "https://open.plantbook.io/api/v1/plant/";
const FIRST_FETCH = `search?alias=`;
const SECOND_FETCH = "detail/";
const apiToken = process.env.REACT_APP_ACCESS_TOKEN;


class ExternalApi {

  // Public
  static async getPlants(plantName) {
      console.log("getplants",plantName);
      console.log("token");
    plantName.replace(/\s/g, "%20");
    
    let result = await ExternalApi._myFetch(
      `${BASE_URL}${FIRST_FETCH}${plantName}`
    );
    console.log("result", result);
    return result;
  }

  static async getPlantDetail(pid) {
    let result = ExternalApi._myFetch(`${BASE_URL}${SECOND_FETCH}${pid}`);
    return result;
  }

  //Private!
  static async _myFetch(url) {
    
    // let options = {
    //   // mode: "no-cors",

    //   headers: { Authorization: "Bearer " + apiToken },
    //   method: "GET"
    // };
    console.log("inside _myFetch URL", url, apiToken);
    // console.log("myfetch options", options);
    let response;
    try {
      response = await fetch(url, {headers: { Authorization: "Bearer " + apiToken },
      method: "GET"});
      console.log("inside Fetch response", response);
      if (response.ok) {
        response.data = await response.json();
      } else {
        response.error = `${response.status}: ${response.statusText}`;
      }
    } catch (err) {
      response = {
        ok: false,
        error: err.message,
      };
    }
    console.log("inside _myFetch response", response);
    return response;
  }
}

export default ExternalApi;
