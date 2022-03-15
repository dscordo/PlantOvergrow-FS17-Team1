
const BASE_URL = "https://open.plantbook.io/api/v1/plant/"
const FIRST_FETCH = `search?alias=`;
const SECOND_FETCH = "detail/"
let apiToken = process.env.REACT_APP_ACCESS_TOKEN;

class Api {
    // Public
    static async getPlants(plantName) {
        plantName.replace(/\s/g, '%20')
        let result = await Api._myFetch( `${BASE_URL}${FIRST_FETCH}${plantName}/`);
        return result
    }

    static async getPlantDetail(pid) {
        let result = Api._myFetch( `${BASE_URL}${SECOND_FETCH}${pid}/`);
        return result
    }
    
      //Private!
    
        static async _myFetch(url) {
        let options = { method: "GET", headers: {Authorization : 'Bearer' + apiToken}}

        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = {
                ok: false,
                error: err.message
            };
        }
        return response;
    }
}


export default Api;
